from .db import db, environment,SCHEMA, add_prefix_for_prod

from datetime import datetime

class PayPeriod(db.Model):
    __tablename__ = "payperiods"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    # payperiod entry created before populated with set start and end dates
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)

    #weekly, biweekly, monthly
    frequency = db.Column(db.String(10), default="weekly")

    # open --- ppt_Pay + ppt_Hours == updated with added timecards, everything updateable (can allow for manual addition of timecard outside of period dateframe)
    # pending --- pause all edits
    # approved ---> "ping" requester ---> return to open
    # locked --- nothing can be edited
    status = db.Column(db.String(15), default="open")

    ppt_Pay = db.Column(db.Numeric(precision=10, scale=2), default=0.00)
    # ppt_Hours = db.Column(db.Integer, default=0)
    ppt_Hours = db.Column(db.Numeric(precision=10, scale=1), default=0.0)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    timecards = db.relationship(
        "TimeCard",
        back_populates="payperiod",
        cascade='all, delete-orphan' # when all cards are deleted from a period the period entry is deleted
    )

    def full_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "period_duration": [self.start_date.strftime("%m-%d-%Y"), self.end_date.strftime("%m-%d-%Y")],
            "frequency": self.frequency,
            "status": self.status,
            "period_total_pay": self.ppt_Pay,
            "period_total_hours": self.ppt_Hours,
            "timecards": [card.to_dict() for card in self.timecards]
        }

    def stub_dict(self):
        return {
            "ids": {"stubID": self.id, "userID": self.user_id},
            "period_duration": [self.start_date.strftime("%m-%d-%Y"), self.end_date.strftime("%m-%d-%Y")],
            "period_total_pay": self.ppt_Pay,
            "period_total_hours": self.ppt_Hours,
            "timecards": [card.to_dict() for card in self.timecards]
        }
