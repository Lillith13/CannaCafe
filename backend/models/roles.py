from .db import db, environment, SCHEMA, add_prefix_for_prod

class Role(db.Model):
    __tablename__ = "roles"

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id  = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(255), nullable=False)

    payrate = db.Column(db.Numeric(precision=10, scale=2))

    users = db.relationship(
        "User",
        back_populates="role"
    )

    def to_dict(self):
        return {
            "name": self.name,
            "payrate": self.payrate if self.payrate else None
        }
