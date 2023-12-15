from datetime import date
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    review = db.Column(db.String, nullable=False)

    rating = db.Column(db.Integer, nullable=False)

    created_at = db.Column(db.Date, nullable=False, default = date.today())

    updated_at = db.Column(db.Date, nullable=False, default = date.today())

    product = db.relationship(
        "Product",
        back_populates="reviews"
    )

    user = db.relationship(
        "User",
        back_populates="reviews"
    )

    def to_dict(self):
        return {
            "id": self.id,
            'user': self.user.rev_dict(),
            "product": self.product.rev_dict(),
            "review": self.review,
            "rating": self.rating,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def user_dict(self):
        return {
            "id": self.id,
            "product": self.product.rev_dict(),
            "review": self.review,
            "rating": self.rating,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
    def prod_dict(self):
        return {
            'id': self.id,
            'user': self.user.rev_dict(),
            "product": self.product.rev_dict(),
            "review": self.review,
            "rating": self.rating,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
