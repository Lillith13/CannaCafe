from flask import Blueprint, request
from flask_login import current_user, login_required

from ...models import db, Wishlist, WishlistDetail, Product
from .auth_helper import validation_errors_to_error_messages

wishlist_routes = Blueprint('wishlist', __name__, url_prefix="/wishlist")

@wishlist_routes.route("/")
@login_required
def getWishlist():
    wishlist = Wishlist.query.filter(Wishlist.user_id == current_user.get_id()).first()
    wishDict = wishlist.to_dict()
    return { "Wishlist": wishDict['products'] }

@wishlist_routes.route("/<int:id>", methods=["POST", "DELETE"])
@login_required
def addToWishlist(id):
    product = Product.query.get(id)
    wishlist = Wishlist.query.filter(Wishlist.user_id == current_user.get_id()).first()

    if not product:
        return {'errors': validation_errors_to_error_messages({"Product": "Product doesn't exist"})}, 404

    if request.method == "POST":
        wishlist.products.append(product)
        db.session.commit()
        return {"message": "successful"}

    if request.method == "DELETE":
        wishlist.products.remove(product)
        db.session.commit()
        return {"message": "successful"}

    return {'errors': validation_errors_to_error_messages({"Bad_Request": "Bad Request"})}, 400
