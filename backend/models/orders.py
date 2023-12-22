from .db import db, environment, SCHEMA, add_prefix_for_prod
from .joins import OrderProduct
from .products import Product
import datetime

class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.INTEGER, primary_key=True)

    user_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    total = db.Column(db.Numeric(precision=10, scale=2), default=0)

    placed = db.Column(db.DateTime, default=datetime.datetime.utcnow(), nullable=False)

    shipped = db.Column(db.Date)

    fulfilled = db.Column(db.Date)


    products = db.relationship(
        "Product",
        secondary=add_prefix_for_prod("order_products"),
        back_populates="orders"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "products": [product.to_dict() for product in self.products],
            'total': self.total,
            'placed': self.placed,
            'shipped': self.shipped,
            'fulfilled': self.fulfilled,
        }
