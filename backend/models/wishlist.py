from .db import db, environment,SCHEMA, add_prefix_for_prod

class Wishlist (db.Model):
    __tablename__ = "wishlists"


    if environment == "production":
     __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))


    products = db.relationship(
       "Product",
       secondary=add_prefix_for_prod("wishlist_details"),
       back_populates="wishlist"
    )

    wish = db.relationship(
      "User",
      back_populates="wishlist"
   )

    def to_dict(self):
       return {
          "id": self.id,
          "user_id": self.user_id,
          "products": [product.to_dict() for product in self.products]
       }
