from .db import db, environment, SCHEMA, add_prefix_for_prod

class Category(db.Model):
    __tablename__ = "categories"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.INTEGER, primary_key=True)

    name = db.Column(db.String(255), nullable=False)

    age_restricted = db.Column(db.Boolean, default=True, nullable=False)

    shippable = db.Column(db.Boolean, default=False, nullable=False)

    products = db.relationship(
        "Product",
        secondary=add_prefix_for_prod("category_products"),
        back_populates="category"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'age_restricted': self.age_restricted,
            'shippable': self.shippable
        }

    def filter_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'products': [product.to_dict() for product in self.products],
            'age_restricted': self.age_restricted,
            'shippable': self.shippable
        }
