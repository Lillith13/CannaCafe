from .db import db, environment,SCHEMA, add_prefix_for_prod

class Favorite (db.Model):
    __tablename__ = "favorites"


    if environment == "production":
     __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))


    products = db.relationship(
       "Product",
       secondary=add_prefix_for_prod("favorite_details"),
       back_populates="favorite"
    )

    fave = db.relationship(
      "User",
      back_populates="favorite"
   )

    #secondary states what the join table is

    def to_dict(self):
       return {
          "id": self.id,
          "user_id": self.user_id,
          "products": dict( [(product.id, { "id": product.id, "name": product.name, "price": product.price}) for product in self.products ])
       }
