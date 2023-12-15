from flask import Blueprint, request
from flask_login import login_required, current_user
from .auth_helper import validation_errors_to_error_messages

from ...models import db, Review, Product
from ...forms import ReviewForm

review_routes = Blueprint("/reviews", __name__, url_prefix="/reviews")

@review_routes.route("/")
@login_required
def usersReviews():
    reviews = Review.query.all()
    if not len(reviews):
        return { "Reviews": None }
    return { "Reviews": [review.to_dict() for review in reviews] }

@review_routes.route("/<int:revId>", methods=["PUT", "DELETE"])
@login_required
def postReview(revId):
    review = Review.query.get(revId)
    if not review:
        return {'errors': validation_errors_to_error_messages({"Bad_Requents": "Review doesn't exist"})}, 400

    if request.method == "DELETE":
        db.session.delete(review)
        db.session.commit()

    if request.method == 'PUT':
        form = ReviewForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.errors:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401

        if form.validate_on_submit():
            data = form.data
            # print(data)
            if review.rating != data['rating']:
                review.rating = data['rating']

            if review.review != data['rev']:
                review.review = data['rev']

            db.session.commit()

        if request.method == "DELETE":
            db.session.delete(review)
            db.session.commit()

    return { "message": "successful" }


# * At a later date add ability to comment on and add images to reviews
