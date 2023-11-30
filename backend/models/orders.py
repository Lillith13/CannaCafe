from .db import db, environment, SCHEMA, add_prefix_for_prod
from .joins import OrderProduct
from .products import Product
from datetime import date

class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.INTEGER, primary_key=True)

    user_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    placed = db.Column(db.Date, default=date.today(), nullable=False)

    shipped = db.Column(db.Date)

    fulfilled = db.Column(db.Date)


    products = db.relationship(
        "Product",
        secondary=add_prefix_for_prod("order_products"),
        back_populates="orders"
    )

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "products": [product.to_dict() for product in self.products],
            'placed': self.placed,
            'shipped': self.shipped,
            'fulfilled': self.fulfilled,
        }
