from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from datetime import date, datetime, timedelta
import math
from .auth_helper import validation_errors_to_error_messages

from ...models import db, TimeCard, PayPeriod, User, Role
from ...forms import TimecardForm

timecard_routes = Blueprint("timecard", __name__, url_prefix="/timecard")

@timecard_routes.route("/<int:userId>")
@login_required
def getPaystubs(userId):
    if int(current_user.get_id()) == int(userId):
        stubs = PayPeriod.query.filter(PayPeriod.user_id == current_user.get_id()).all()

        return jsonify([stub.full_dict() for stub in stubs])

    else:
        user = User.query.get(int(current_user.get_id()))
        userRole = Role.query.filter(Role.id == int(user.role.id)).first()

        if userRole.name != "Manager" and userRole.name != "Owner":
            return {'errors': validation_errors_to_error_messages({"Not_Allowed": "You do not have the correct permissions to perform this action"})}, 403

        targetUser = User.query.get(int(userId))
        targetUserRole = Role.query.filter(Role.id == int(targetUser.role.id)).first()

        if targetUserRole.name == "Manager" and userRole.name != "Owner":
            return {'errors': validation_errors_to_error_messages({"Not_Allowed": "You do not have the correct permissions to perform this action"})}, 403

        if targetUserRole.name == "Member":
            return {'errors': validation_errors_to_error_messages({"Not_Allowed": "Target user must be at least an employee to have a timecard"})}, 403

        stubs = PayPeriod.query.filter(PayPeriod.user_id == userId).all()

        return jsonify([stub.stub_dict() for stub in stubs])

@timecard_routes.route("/clockin", methods=["POST"])
@login_required
def empClockin():
    # check if timecards exists (already clocked in?)
    cardCheck = TimeCard.query.filter(TimeCard.user_id == current_user.get_id()).filter(TimeCard.clocked_out == None).first()
    # check for parent payperiod or "paystub"
    stubCheck = PayPeriod.query.filter(PayPeriod.user_id == current_user.get_id()).filter(PayPeriod.start_date <= datetime.now and PayPeriod.end_date >= datetime.now)

    # if timecard card exists (already clocked in) --- ERROR
    if cardCheck:
        return {'errors': "Cannot clock in with an already open timecard"}, 403

    # if paystub doesn't exist --- create new
    if not stubCheck:
        # create a new paystub
        user = User.query.filter(User.id == current_user.get_id())
        allUserStubs = PayPeriod.query.filter(PayPeriod.user_id == current_user.get_id())
        mostRecentEnd = allUserStubs[allUserStubs.length() - 1].end_date

        start = mostRecentEnd + timedelta(days=1)
        freq = 6
        if user.frequency == "biweekly": freq = 13
        elif user.frequency == "monthly": freq = 30

        newStub = PayPeriod(
            start_date = start,
            end_date = start + timedelta(days=freq),
            frequency = user.pay_frequency or "weekly",
            user_id = user.id
        )

        db.session.add(PayPeriod)
        db.session.commit()

        stubCheck = newStub

    new_timecard = TimeCard(
        user_id = current_user.get_id(),
        clocked_in = datetime.now(),
        payperiod_id = stubCheck.id
    )
    db.session.add(new_timecard)
    db.session.commit()
    return {"message": "successful"}

@timecard_routes.route("/clockout", methods=["POST"])
@login_required
def empClockout():
    cardCheck = TimeCard.query.filter(TimeCard.clocked_out == None).first()
    if not cardCheck:
        return {'errors': {"clockerror": "You haven't clocked in yet"}}, 403

    user = User.query.get(current_user.get_id())

    timecard = TimeCard.query.filter(TimeCard.user_id == current_user.get_id()).order_by(TimeCard.id.desc()).first()

    timecard.clocked_out = datetime.now()

    db.session.commit()
    timecard.record_pay()

    # update paystub
    paystub = PayPeriod.query.filter(PayPeriod.id == timecard.payperiod_id)
    c_in = datetime.strptime(timecard.clocked_in, "%H:%M:%S")
    c_out = datetime.strptime(timecard.clocked_out)
    hours = (c_out - c_in).total_seconds() / 3600
    pay = hours * user.payrate

    paystub.ppt_Hours = paystub.ppt_Hours + hours
    paystub.ppt_Pay = paystub.ppt_Pay + pay

    db.session.commit()
    return {"message": "successful"}

@timecard_routes.route("/<int:empId>", methods=["POST", "PUT", "DELETE"])
@login_required
def empTimeCorrection(empId):
    form = TimecardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    user = User.queary.get(current_user.get_id())

    if user.role != "Manager" or user.role != "Owner":
        return {"errors": {"Not_Allowed": "You do not have permission to perform this action"}}, 403

    if form.validate_on_submit:
        targetUser = User.query.get(empId)
        if targetUser.role == "Manager" and user.role != "Owner":
            return {"errors": {"Not_Allowed": "You do not have permission to perform this action"}}, 403

        data = form.data

        if request.method == "PUT":
            timecard = TimeCard.query.get(data['cardId']).first()
            paystub = PayPeriod.query.get(timecard.payperiod_id)

            if timecard.clock_in != data['ClockIn']:

                if data['ClockIn'] < paystub.start_date or data['ClockIn'] > paystub.end_date:
                    # find the correct paystub for the corrected timecard
                    correctStub = PayPeriod.query.filter(PayPeriod.start_date <= data['ClockIn'] and PayPeriod.end_date >= data['ClockOut'])
                    # if correct paystub doesn't exist create it
                    if not correctStub or correctStub.frequency != user.pay_frequency:
                        # create a new paystub
                        user = User.query.filter(User.id == current_user.get_id())
                        allUserStubs = PayPeriod.query.filter(PayPeriod.user_id == current_user.get_id())
                        mostRecentEnd = allUserStubs[allUserStubs.length() - 1].end_date

                        start = mostRecentEnd + timedelta(days=1)
                        freq = 6
                        if user.frequency == "biweekly": freq = 13
                        elif user.frequency == "monthly": freq = 30
                        newStub = PayPeriod(
                            start_date = start,
                            end_date = start + timedelta(days=freq),
                            frequency = user.pay_frequency,
                            user_id = user.id,
                        )
                        db.session.add(newStub)
                        db.session.commit()
                        correctStub = newStub
                    timecard.payperiod_id = correctStub.id
                    db.session.commit()
                timecard.clock_in = data['ClockIn']

            if timecard.clock_out != data['ClockOut']:
                timecard.clock_out = data['ClockOut']

            db.sesson.commit()
            timecard.record_pay()

            stub = PayPeriod.query.get(timecard.payperiod_id)
            c_in = datetime.strptime(timecard.clocked_in, "%H:%M:%S")
            c_out = datetime.strptime(timecard.clocked_out)
            hours = (c_out - c_in).total_seconds() / 3600
            pay = hours * user.payrate

            # update info on new paystub
            stub.ppt_Hours = stub.ppt_Hours + hours
            stub.ppt_Pay = stub.ppt_Pay + pay

            # remove timecard info from old paystub
            paystub.ppt_Hours = paystub.ppt_Hours - hours
            paystub.ppt_Pay = paystub.ppt_Pay - pay

            db.session.commit()

        if request.method == "POST":
            empId = request.get_data()
            stub = PayPeriod.query.filter(PayPeriod.start_date <= data['ClockIn'] and PayPeriod.end_date >= data['ClockOut'])

            # if no valid paystub exists for new timecard, create new
            if not stub or stub.frequency != user.pay_frequency:
                user = User.query.get(empId)
                allUserStubs = PayPeriod.query.filter(PayPeriod.user_id == current_user.get_id())
                # first payperiod created on employee account creation so there will always be at least one paystub
                mostRecentEnd = allUserStubs[allUserStubs.length() - 1].end_date

                start = mostRecentEnd + timedelta(days=1)
                freq = 6
                if user.frequency == "biweekly": freq = 13
                elif user.frequency == "monthly": freq = 30

                newStub = PayPeriod(
                    start_date = start,
                    end_date = start + timedelta(days=freq),
                    frequency = user.pay_frequency or "weekly",
                    user_id = empId
                )
                db.sessionn.add(newStub)
                db.session.commit()
                stub = newStub

            new_timecard = TimeCard(
                user_id = empId,
                clock_in = data['ClockIn'],
                payperiod_id = stub.id
            )
            db.session.add(new_timecard)
            db.session.commit()

            if data['ClockOut']:
                new_timecard.clocked_out = data['ClockOut']

            db.session.commit()

            if data['ClockOut']:
                timecard.record_pay()

            c_in = datetime.strptime(new_timecard.clocked_in, "%H:%M:%S")
            c_out = datetime.strptime(new_timecard.clocked_out)
            hours = (c_out - c_in).total_seconds() / 3600
            pay = hours * user.payrate
            # updatae paystub
            stub.ppt_Hours = stub.ppt_Hours + hours
            stub.ppt_Pay = stub.ppt_Pay + pay

            db.session.commit()
            return {"message": "successful"}

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}
    if request.method == "DELETE":
        cardId = request.get_data()
        timecard = TimeCard.query.get(cardId)
        if not timecard:
            return {'errors': {"Not_Found": "Timecard doesn't exist"}}, 404
        db.session.delete(timecard)
        db.session.commit()
        return {"message": "successful"}
    return {'errors': validation_errors_to_error_messages({"Bad_Request": "Bad_Request"})}, 401
