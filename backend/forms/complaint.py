from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired

class ComplaintForm(FlaskForm):
    user_id = IntegerField('user', validators=[DataRequired()])
    product_id = IntegerField('product')
    complaint = TextAreaField('complaint', validators=[DataRequired()])
