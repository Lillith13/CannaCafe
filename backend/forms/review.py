from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired


class ReviewForm(FlaskForm):
    product_id = IntegerField("ProductId")
    user_id = IntegerField("UserId")
    review = TextAreaField("Review", [DataRequired()])
    rating = IntegerField("Rating", [DataRequired()])
