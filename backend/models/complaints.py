from datetime import date
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Complaint(db.Model):
    __tablename__ = "complaints"

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')))

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    complaint = db.Column(db.String(2000), nullable=False)

    reviewed = db.Column(db.Boolean, default=False, nullable=False)

    resolved = db.Column(db.Boolean, default=False, nullable=False)

    created_at = db.Column(db.Date, default=date.today(), nullable=False)

    reviewed_at = db.Column(db.Date)

    resolved_at = db.Column(db.Date)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'productId': self.product_id,
            'complaint': self.complaint,
            'reviewed': self.reviewed,
            'reviewed_at': self.reviewed_at,
            'resolved': self.resolved,
            'resolved_at': self.resolved_at
        }
