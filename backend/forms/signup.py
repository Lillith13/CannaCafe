import re
from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField
from wtforms.validators import DataRequired, Length, ValidationError
from datetime import datetime

from ..models import User


def email_correct_format(form, field):
    validityChecker = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    email = field.data
    if not re.fullmatch(validityChecker, email):
        raise ValidationError('Email must be a valid email address')


def email_exists(form, field):
    """Checking if user exists"""
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    """Checking if username is already in use"""
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def birthday_validator(form, field):
    now = datetime.now()
    birthday = field.data
    dobFormatted = datetime.strptime(birthday, "%Y-%m-%d")
    difference = now - birthday
    age_in_years = difference.days // 365
    if age_in_years < 21:
        raise ValidationError("We sell age-restricted products so you must be 21 or older to sign up. You can still shop our non-age-restricted products as a guest though!")

class SignUpForm(FlaskForm):
    firstName = StringField("First Name", [DataRequired("First name is required."), Length(min=2, message="First name must be 2 characters or longer.")])

    lastName = StringField("Last Name", validators=[Length(min=2, message="First name must be a minimum of 2 charactors long")])

    birthday = DateField('birthday', validators=[DataRequired(), birthday_validator])

    address = StringField('address', validators=[DataRequired()])

    city = StringField('city', validators=[DataRequired()])

    state = StringField('state', validators=[DataRequired()])

    zipcode = IntegerField('zipcode', validators=[DataRequired(), Length(min=5,max=5)])

    username = StringField(
        'username', validators=[DataRequired(), username_exists])

    email = StringField('email', validators=[DataRequired(), email_exists, email_correct_format])

    password = StringField('password', validators=[DataRequired()])
