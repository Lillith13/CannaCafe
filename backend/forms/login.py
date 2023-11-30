from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


def user_exists(form, field):
    creds = field.data
    user = User.query.filter(User.username == creds).first()

    if not user:
        raise ValidationError('Username provided not found.')


def password_matches(form, field):
    password = field.data
    creds = form.data['creds']
    user = User.query.filter(User.username == form.data['creds']).first()

    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    creds = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_matches])
