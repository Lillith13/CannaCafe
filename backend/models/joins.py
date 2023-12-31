from .db import db, environment, SCHEMA, add_prefix_for_prod


class OrderProduct(db.Model):
  __tablename__ = "order_products"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.INTEGER, primary_key=True)

  order_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("orders.id")))

  product_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("products.id")))

  quantity = db.Column(db.INTEGER, default=1)

  def to_dict(self):
    return {
      'id': self.id,
      'order_id': self.order_id,
      'product_id': self.product_id,
      'quantity': self.quantity
    }


class WishlistDetail(db.Model):
    __tablename__ = "wishlist_details"

    if environment == "production":
      __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    wishlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("wishlists.id")))

    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))


class FavoriteDetail(db.Model):
    __tablename__ = "favorite_details"

    if environment == "production":
      __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    favorite_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("favorites.id")))

    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))

class CategoryProduct(db.Model):
  __tablename__ = "category_products"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)

  category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("categories.id")))

  product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))
