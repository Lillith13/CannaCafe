from flask import Blueprint
from flask_login import current_user
from .auth_helper import validation_errors_to_error_messages

from ...models import db, Category

category_routes = Blueprint('categories', __name__, url_prefix="/categories")

@category_routes.route('/')
def getCategories():
    if not current_user:
        categories = Category.query.filter(Category.age_restricted == False)
        return { "Categories": [category.to_dict() for category in categories] }
    categories = Category.query.all()
    return { "Categories": [category.to_dict() for category in categories] }

@category_routes.route("/<string:name>")
def filterCategory(name):
    category = Category.query.filter(Category.name == name).first()
    if not current_user and category.age_restricted:
        return { 'errors': validation_errors_to_error_messages({"Age_Restricted": "Product is age restricted, please log in or create an account to view"})}, 404
    return { "Category_Products": [product.to_dict() for product in category.products] }
