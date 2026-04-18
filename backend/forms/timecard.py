from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField, DecimalField
from wtforms.validators import DataRequired, Length, ValidationError
from datetime import datetime

def validate_clock_in(form, field):
    now = datetime.date.today()
    c_in = field.data
    if c_in > now:
        raise ValidationError('Cannot set clock-in for future time or date')
def validate_clock_out(form, field):
    c_in = form.data['clock_in']
    c_out = field.data
    if c_out < c_in:
        raise ValidationError('Clockiout cannot come before clock-in on the same timecard')

def validatePeriodStartDate(form,field):
    # cannot come before the employee's start date - date employee account became an employee account
    # if other payperiods exist, cannot come before oldest && cannot overlap an existing payperiod for user
    pass

def validatePeriodEndDate(form,field):
    pass

class TimecardForm(FlaskForm):
    clocked_in = DateField("ClockIn", validators=[DataRequired(), validate_clock_in])
    clocked_out = DateField("ClockOut", validators=[validate_clock_in])
    day_pay = DecimalField("DayPay")

class PayPeriodForm(FlaskForm):
    start_date = DateField("StartDate", validators=[DataRequired(), validatePeriodStartDate])
    end_date = DateField("EndDate", validators=[DataRequired(), validatePeriodEndDate])
    frequency = StringField("PayFrequency")
    status = StringField("EdittableStatus")
