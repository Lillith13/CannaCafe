from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime
from .auth_helper import validation_errors_to_error_messages

from ...models import db, TimeCard, User
from ...forms import TimecardForm

timecard_routes = Blueprint("timecard", __name__, url_prefix="/timecard")

@timecard_routes.route("/")
@login_required
def getPaystubs():
    if request.get_data():
        user = User.query.get(current_user.get_id())
        if user.role != "Manager" or user.role != "Owner":
            return {'errors': validation_errors_to_error_messages({"Not_Allowed": "You do not have the correct permissions to perform this action"})}, 403
        id = request.get_data()
        targetUser = User.query.get(int(id))
        if targetUser.role == "Manager" and user.role != "Owner":
            return {'errors': validation_errors_to_error_messages({"Not_Allowed": "You do not have the correct permissions to perform this action"})}, 403
        if targetUser.role == "Member":
            return {'errors': validation_errors_to_error_messages({"Not_Allowed": "Target user must be at least an employee to have a timecard"})}, 403
        timecards = TimeCard.query.filter(TimeCard.user_id == int(id))
    else:
        timecards = TimeCard.query.filter(TimeCard.user_id == current_user.get_id())
    return {"Timecards": [timecard.to_dict() for timecard in timecards]}

@timecard_routes.route("/clockin", methods=["POST"])
@login_required
def empClockin():
    new_timecard = TimeCard(
        user_id = current_user.get_id(),
        clock_in = datetime.now()
    )
    db.session.add(new_timecard)
    db.session.commit()
    return {"message": "successful"}

@timecard_routes.route("/clockout", methods=["PUT"])
@login_required
def empClockout():
    id = request.get_data()
    timecard = TimeCard.query.filter(TimeCard.id == id and TimeCard.user_id == current_user.get_id())
    timecard.clock_out = datetime.now()
    db.session.commit()
    return {"message": "successful"}

@timecard_routes.route("/<int:empId>", methods=["POST", "PUT", "DELETE"])
@login_required
def empTimeCorrection(empId):
    form = TimecardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    user = User.queary.get(current_user.get_id())

    if user.role != "Manager" or user.role != "Owner":
        return {"errors": validation_errors_to_error_messages({"Not_Allowed": "You do not have permission to perform this action"})}, 403

    if form.validate_on_submit:
        targetUser = User.query.get(empId)
        if targetUser.role == "Manager" and user.role != "Owner":
            return {"errors": validation_errors_to_error_messages({"Not_Allowed": "You do not have permission to perform this action"})}, 403
        data = form.data
        if request.method == "PUT":
            timecard = TimeCard.query.get(data['cardId']).first()
            if timecard.clock_in != data['clock_in']:
                timecard.clock_in = data['clock_in']
            if timecard.clock_out != data['clock_out']:
                timecard.clock_out = data['clock_out']
            db.sesson.commit()
            return {"message": "successful"}

        if request.method == "POST":
            empId = request.get_data()
            new_timecard = TimeCard(
                user_id = empId,
                clock_in = data['clock-in']
            )
            if data['clock_out']:
                new_timecard.clocked_out = data['clock_out']
            db.session.add(new_timecard)
            db.session.commit()
            return {"message": "successful"}

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}
    if request.method == "DELETE":
        cardId = request.get_data()
        timecard = TimeCard.query.get(cardId)
        if not timecard:
            return {'errors': validation_errors_to_error_messages({"Not_Fount": "Timecard doesn't exist"})}, 404
        db.session.delete(timecard)
        db.session.commit()
        return {"message": "successful"}
    return {'errors': validation_errors_to_error_messages({"Bad_Request": "Bad_Request"})}, 401
