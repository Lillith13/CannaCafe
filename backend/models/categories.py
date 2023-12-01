from .db import db, environment, SCHEMA, add_prefix_for_prod

class Category(db.Model):
    __tablename__ = "categories"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.INTEGER, primary_key=True)

    name = db.Column(db.String(255), nullable=False)

    age_restricted = db.Column(db.Boolean, nullable=False, default=False)

    # product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))

    products = db.relationship(
        "Product",
        secondary=add_prefix_for_prod("category_products"),
        back_populates="category"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'age_restricted': self.age_restricted
        }

    def filter_dict(self):
        return {
            'id': self.id,
            'products': [product.to_dict() for product in self.products],
            'age_restricted': self.age_restricted
        }
