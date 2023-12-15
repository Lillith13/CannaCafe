from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField, FieldList
from wtforms.validators import DataRequired

class PlaceOrder(FlaskForm):
    itemId = IntegerField('ProductId', [DataRequired()])
    quantity = IntegerField('Product Quantity', [DataRequired()])
