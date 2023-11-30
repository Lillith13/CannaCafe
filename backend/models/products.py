from .db import db, environment, SCHEMA, add_prefix_for_prod

class Product(db.Model):
  __tablename__ = "products"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.INTEGER, primary_key=True)

  name = db.Column(db.String(50), nullable=False)

  description = db.Column(db.String(255), nullable=False)

  price = db.Column(db.Numeric(precision=10, scale=2), nullable=False)

  units_available = db.Column(db.INTEGER, nullable=False)

  preview_image = db.Column(db.String(2000))

  category_id = db.Column(db.INTEGER, nullable=False)

  added_by = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("users.id")))


  category = db.relationship(
    "Category",
    back_populates="products"
  )
  reviews = db.relationship(
    "Review",
    back_populates="product"
  )

  orders = db.relationship(
    "Order",
    secondary=add_prefix_for_prod("order_products"),
    back_populates="products"
  )

  wishlist = db.relationship(
    "Wishlist",
    secondary=add_prefix_for_prod("wishlist_details"),
    back_populates="products"
  )
  favorite = db.relationship(
    "Favorite",
    secondary=add_prefix_for_prod("favorite_details"),
    back_populates="products"
  )

  images = db.relationship(
    "ProductImage",
    back_populates="product"
  )

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'category': self.category,
      'price': self.price,
      'description': self.description,
      'category': self.category,
      'units_available': self.units_available
    }
