from .db import db, environment, SCHEMA, add_prefix_for_prod

class Category(db.Model):
    __tablename__ = "categories"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.INTEGER, primary_key=True)

    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)

    age_restricted = db.Column(db.Boolean, nullable=False, default=False)

    products = db.relationship(
        "Product",
        back_populates="category"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'products': [product.to_dict() for product in self.products],
            'age_restricted': self.age_restricted
        }
