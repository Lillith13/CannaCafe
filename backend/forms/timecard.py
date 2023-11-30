from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField
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

class TimecardForm(FlaskForm):
    clocked_in = DateField("ClockIn", validators=[DataRequired(), validate_clock_in])
    clocked_in = DateField("ClockIn", validators=[validate_clock_in])
