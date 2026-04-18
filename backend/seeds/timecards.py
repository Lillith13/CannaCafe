from ..models import db, environment, SCHEMA, User, Role, PayPeriod, TimeCard
from sqlalchemy.sql import text
from faker import Faker
from random import choice, randint
from datetime import timedelta
from decimal import Decimal


fake = Faker('la')

def seed_payStubs():
    staff = ["Employee", "Manager", "Owner"]
    employeeIDs = [
        user.id
        for user in User.query.filter(
            User.role.has(Role.name.in_(staff))
        ).all()
    ]

    stubsList = seed_payperiods(employeeIDs)

def undo_payStubs():
    undo_timecards()
    undo_payperiods()

#

def calcEmployeedTime(frequency):
    employeedFor = randint(1, 5)
    cardLoopLength = 0
    stubLoopLength = 0

    if(frequency == "weekly"):
        cardLoopLength = randint(4, 7) # timecards per pay_period
        stubLoopLength = ((employeedFor * 12) * 4) # total num pay_periods
    elif (frequency == "biweekly"):
        cardLoopLength = randint(5, 15)
        stubLoopLength = ((employeedFor * 12) * 2)
    else:
        cardLoopLength = randint(10, 31)
        stubLoopLength = (employeedFor * 12)

    return [cardLoopLength, stubLoopLength]

def seed_payperiods(employeeIDs):
    payPeriodOptions = ["weekly", "biweekly", "monthly"]

    for empID in employeeIDs:
        start_date = fake.date_between(start_date='-1y', end_date='today')
        # normalize to start of week (optional but realistic)
        start_date = start_date - timedelta(days=start_date.weekday() + 1 % 7)

        frequency = choice(payPeriodOptions)
        user = User.query.filter(User.id == empID)
        user.pay_frequency = frequency

        pay_periods = []

        cardLoopLength, stubLoopLength = calcEmployeedTime(frequency)
        # print("the lengthseseses! => ", cardLoopLength, stubLoopLength)

        for _ in range(stubLoopLength):
            end_date = start_date + timedelta(days=6)

            pay_periods.append(PayPeriod(
                start_date = start_date,
                end_date = end_date,
                user_id = empID,
                frequency = frequency
            ))

            start_date = start_date + timedelta(days=7)
            stubLoopLength = stubLoopLength - 1

        db.session.add_all(pay_periods)
        db.session.commit()
        seed_timecards(pay_periods, employeeIDs, cardLoopLength)

def undo_payperiods():
    if environment == "production":
        db.session.execute(text(f"TRUNCATE table {SCHEMA}.payperiods RESTART IDENTITY CASCADE"))
    else:
        db.session.execute(text("DELETE FROM payperiods"))
        db.session.commit()

#

def seed_timecards(payperiods, employeeIDs, cardLoopLength):
    for empID in employeeIDs:

        for stub in payperiods:
            ppt_Hours = 0
            ppt_Pay = Decimal("0.00")
            cards = []

            for _ in range(cardLoopLength):
                # random clock-in within the pay period
                clocked_in = fake.date_time_between(
                    start_date=stub.start_date,
                    end_date=stub.end_date
                )

                # shift length (4–12 hours)
                hours_worked = randint(4, 12)

                clocked_out = clocked_in + timedelta(hours=hours_worked)

                emp = User.query.get(empID)
                day_pay = emp.pay_rate * hours_worked

                cards.append(TimeCard(
                    user_id = empID,
                    clocked_in = clocked_in,
                    clocked_out = clocked_out,
                    day_pay = day_pay,  # can calculate later
                    payperiod_id = stub.id
                ))

                ppt_Hours = ppt_Hours + hours_worked
                ppt_Pay = Decimal(ppt_Pay) + day_pay

            stub.ppt_Hours = ppt_Hours #update stub ppt_Hours
            stub.ppt_Pay = ppt_Pay #update stub ppt_Pay
            db.session.add_all(cards)
            db.session.commit()

def undo_timecards():
    if environment == "production":
        db.session.execute(text(f"TRUNCATE table {SCHEMA}.timecards RESTART IDENTITY CASCADE"))
    else:
        db.session.execute(text("DELETE FROM timecards"))
        db.session.commit()
