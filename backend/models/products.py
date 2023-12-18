from .db import db, environment, SCHEMA, add_prefix_for_prod

class Product(db.Model):
  __tablename__ = "products"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.INTEGER, primary_key=True)

  name = db.Column(db.String(50), nullable=False)

  description = db.Column(db.String(2000), nullable=False)

  price = db.Column(db.Numeric(precision=10, scale=2), nullable=False)

  units_available = db.Column(db.INTEGER, nullable=False)

  preview_image = db.Column(db.String(2000))

  preview_image_name = db.Column(db.String(2000))

  category_id = db.Column(db.INTEGER)

  added_by = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("users.id")))


  category = db.relationship(
    "Category",
    secondary=add_prefix_for_prod("category_products"),
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
      'category': [cat.to_dict() for cat in self.category][0],
      'price': self.price,
      'description': self.description,
      'units_available': self.units_available,
      'previewImg': self.preview_image,
    }

  def rev_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'preview': self.preview_image,
      'category': [cat.to_dict() for cat in self.category][0]
    }

  def product_reviews(self):
    return {
      'id': self.id,
      'reviews': [review.prod_dict() for review in self.reviews]
    }

  def comp_dict(self):
    """lazy loaded - no relationship connection"""
    return {
      'id': self.id,
      'name': self.name
    }

  def order_dict(self):
    return {
      'units_available': self.units_available,
      'price': self.price
    }
