from .db import db, environment, SCHEMA, add_prefix_for_prod

class ProductImage(db.Model):
  __tablename__ = "product_images"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.INTEGER, primary_key=True)

  product_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod('products.id'), ondelete='CASCADE'))

  url = db.Column(db.String(2000), nullable=False)

  image_name = db.Column(db.String(2000), nullable=False)

  product = db.relationship(
    "Product",
    back_populates="images"
  )

  def to_dict(self):
    return {
      "id": self.id,
      "url": self.url,
      "product_id": self.product_id
    }
