from .db import db, environment,SCHEMA, add_prefix_for_prod
from datetime import datetime

class TimeCard(db.Model):
    __tablename__ = "timecards"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    clocked_in = db.Column(db.DateTime, nullable=False, default=datetime.now())

    clocked_out = db.Column(db.DateTime)

    day_pay = db.Column(db.Numeric(precision=10, scale=2))

    user = db.relationship(
        "User",
        back_populates="dailytimecards"
    )

    def record_pay(self):
        if self.clocked_out:
            c_in = datetime.strptime(self.clocked_in, "%H:%M:%S")
            c_out = datetime.strptime(self.clocked_out)
            hours = c_out - c_in
            self.day_pay = hours * self.user.payrate

    def to_dict(self):
        return {
            'id': self.id,
            'clocked_in': self.clocked_in,
            'clocked_out': self.clocked_out,
            'day_pay': self.day_pay
        }

    def get_pay(self):
        return self.day_pay

# ! Add Paystubs table later (for now the paystubs can be calculated on the front end - aka daily pay)
