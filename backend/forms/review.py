from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired


class ReviewForm(FlaskForm):
    rev = TextAreaField("Review", [DataRequired()])
    rating = IntegerField("Rating", [DataRequired()])
