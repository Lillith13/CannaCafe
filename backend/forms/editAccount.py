import re
from flask_wtf import FlaskForm
from flask_login import current_user
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
    user = User.query.filter(User.email == email and User.id != current_user.get_id()).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    """Checking if username is already in use"""
    username = field.data
    user = User.query.filter(User.username == username and User.id != current_user.get_id()).first()
    if user:
        raise ValidationError('Username is already in use.')

def check_if_required(form, field):
    oldpass = form.data['oldpass']
    newpass = field.data
    if newpass and not oldpass:
        raise ValidationError('You current password to change your password.')


class EditAccountForm(FlaskForm):
    firstName = StringField("First Name", [DataRequired("First name is required."), Length(min=2, message="First name must be 2 characters or longer.")])

    lastName = StringField("Last Name", validators=[Length(min=2, message="First name must be a minimum of 2 charactors long")])

    address = StringField('address', validators=[DataRequired()])

    city = StringField('city', validators=[DataRequired()])

    state = StringField('state', validators=[DataRequired()])

    zipcode = IntegerField('zipcode', validators=[DataRequired(), Length(min=5,max=5)])

    email = StringField('email', validators=[DataRequired(), email_exists, email_correct_format])

    phone = StringField('phone')

    role = IntegerField('role')

    oldpassword = StringField('oldpass')

    newpassword = StringField('newpass', validators=[check_if_required])
