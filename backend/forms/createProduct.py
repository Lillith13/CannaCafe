from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, FloatField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange
from ..api.routes.aws_helper import ALLOWED_EXTENSIONS

class ProductForm(FlaskForm):

  productId = IntegerField("productId")

  name = StringField("Product Name", validators=[DataRequired(), Length(3,50)])

  price = FloatField("Price $", validators=[DataRequired()])

  description = TextAreaField("Description", validators=[DataRequired(), Length(10, 2000)])

  units_available = IntegerField("# Available", validators=[DataRequired(), NumberRange(max=999999, message="There is no way there are 1m or more of this product available...")])

  category = StringField("Category", validators=[DataRequired()])

  preview = FileField("Image file", validators=[ FileAllowed(list(ALLOWED_EXTENSIONS))])
  """ FileRequired(), """
  # img1 = FileField("Image file", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])

  # img2 = FileField("Image file", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])

  # img3 = FileField("Image file", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])

  # img4 = FileField("Image file", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])

  # img5 = FileField("Image file", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
