from flask import Blueprint, request
from flask_login import login_required, current_user
from .auth_helper import validation_errors_to_error_messages

from ..models import db, Review, Product
from ..forms import ReviewForm

review_routes = Blueprint("/reviews", __name__, url_prefix="/reviews")

@review_routes.route("/")
@login_required
def usersReviews():
    reviews = Review.query.filter(Review.user_id == current_user.get_it()).all()
    if not len(reviews):
        return { "Reviews": None }
    return { "Reviews": [review.to_dict() for review in reviews] }

@review_routes.route("/<int:itemId>", methods=["POST", "PUT", "DELETE"])
@login_required
def postReview(itemId):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        if request.method == "POST":
            product = Product.query.filter(Product.id == itemId).first()
            if not product:
                return {'errors': validation_errors_to_error_messages({"Bad_Request": "Product doesn't exist"})}, 400
            new_review = Review(
                product_id = itemId,
                user_id = current_user.get_id(),
                review = data['review'],
                rating = data['rating']
            )
            db.session.add(new_review)
            db.session.commit()
            return { "message": "successful" }

        if request.method == "PUT":
            review = Review.query.filter(Review.product_id == itemId).first()
            if not review:
                return {'errors': validation_errors_to_error_messages({"Bad_Requents": "Review doesn't exist"})}, 400
            if review.rating != data['rating']:
                review.rating = data['rating']
            if review.review != data['review']:
                review.review = data['review']
            db.session.commit()
            return { "message": "successful" }

    if request.method == "DELETE":
        review = Review.query.filter(Review.product_id == itemId and Review.user_id == current_user.get_id()).first()
        if not review:
            return {'errors': validation_errors_to_error_messages({"Bad_Requents": "Review doesn't exist"})}, 400
        db.session.delete(review)
        db.session.commit()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# * At a later date add ability to comment on and add images to reviews
