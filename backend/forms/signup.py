import re
from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, Length, ValidationError
from ..api.routes.aws_helper import ALLOWED_EXTENSIONS
from datetime import datetime

from ..models import User


def email_correct_format(form, field):
    validityChecker = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    email = field.data
    if not re.fullmatch(validityChecker, email):
        raise ValidationError('Invalid email')


def email_exists(form, field):
    """Checking if user exists"""
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email already in use.')


def username_exists(form, field):
    """Checking if username is already in use"""
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def birthday_validator(form, field):
    now = datetime.now()
    birthday = field.data
    dobFormatted = datetime.strptime(str(birthday), "%Y-%m-%d")
    difference = now - dobFormatted
    age_in_years = difference.days // 365
    if age_in_years < 21:
        raise ValidationError("Must be 21 or older")

class SignUpForm(FlaskForm):
    profile_pic = FileField("Profile Picture", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])

    firstName = StringField("First Name", [DataRequired("First name is required."), Length(min=2, message="First name too short.")])

    lastName = StringField("Last Name", validators=[DataRequired("Last name is required."), Length(min=2, message="Last name too short.")])

    birthday = DateField('birthday', validators=[DataRequired("Birthday is required"), birthday_validator])

    address = StringField('address', validators=[DataRequired("Address is required")])

    city = StringField('city', validators=[DataRequired("City is required")])

    state = StringField('state', validators=[DataRequired("State is required")])

    zipcode = StringField('zipcode', validators=[DataRequired("Zipcode is required"), Length(min=5,max=5, message="Invalid zipcode")])

    username = StringField(
        'username', validators=[DataRequired("Username is required"), username_exists])

    role = StringField('roleName')

    email = StringField('email', validators=[DataRequired("Email is required"), email_exists, email_correct_format])

    phone = StringField('phone')

    password = StringField('password', validators=[DataRequired("Password is required")])
