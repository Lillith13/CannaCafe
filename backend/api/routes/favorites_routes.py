from flask import Blueprint, request
from flask_login import current_user, login_required

from ...models import db, Favorite, FavoriteDetail, Product
from .auth_helper import validation_errors_to_error_messages

favorite_routes = Blueprint('favorite', __name__, url_prefix='/favorites')

@favorite_routes.route("/")
@login_required
def getFavorites():
    favorites = Favorite.query.filter(Favorite.user_id == current_user.get_id()).first()
    favDict = favorites.to_dict()
    return { "Favorites": favDict['products'] }

@favorite_routes.route("/<int:id>", methods=["POST", "DELETE"])
@login_required
def addToFavorites(id):
    product = Product.query.get(id)
    favorites = Favorite.query.filter(Favorite.user_id == current_user.get_id()).first()

    if not product:
        return {'errors': validation_errors_to_error_messages({"Product": "Product doesn't exist"})}, 404

    if request.method == "POST":
        favorites.products.append(product)
        db.session.commit()
        return {"message": "successful"}

    if request.method == "DELETE":
        favorites.products.remove(product)
        db.session.commit()
        return {"message": "successful"}

    return {'errors': validation_errors_to_error_messages({"Bad_Request": "Bad Request"})}, 400
