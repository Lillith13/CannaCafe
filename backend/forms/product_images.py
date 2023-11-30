from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from ..api.aws_helper import ALLOWED_EXTENSIONS

class ProductImageForm(FlaskForm):
  image = FileField('image', validators=[FileRequired(), FileAllowed(ALLOWED_EXTENSIONS)])