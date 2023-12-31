from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import date

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    # ! Add Validators

    id = db.Column(db.Integer, primary_key=True)

    profile_image = db.Column(db.String(2000))

    firstName = db.Column(db.String(50), nullable=False)

    lastName = db.Column(db.String(50), nullable=False)

    birthday = db.Column(db.Date, nullable=False)

    address = db.Column(db.String(50), nullable=False)

    city = db.Column(db.String(50), nullable=False)

    state = db.Column(db.String(50), nullable=False)

    zipcode = db.Column(db.String(5), nullable=False)

    username = db.Column(db.String(40), nullable=False, unique=True)

    email = db.Column(db.String(255), nullable=False, unique=True)

    phone = db.Column(db.String(20))

    hashed_password = db.Column(db.String(255), nullable=False)

    role_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("roles.id")), nullable=False)

    pay_rate = db.Column(db.Numeric(precision=10, scale=2))

    created_at = db.Column(db.Date, default=date.today(), nullable=False)

    role = db.relationship(
        "Role",
        back_populates='users',
    )
    dailytimecards = db.relationship(
        "TimeCard",
        back_populates="user",
        cascade='all, delete-orphan'
    )

    wishlist = db.relationship(
        "Wishlist",
        back_populates="wish",
        cascade='all, delete-orphan'
    )
    favorite = db.relationship(
        "Favorite",
        back_populates="fave",
        cascade='all, delete-orphan'
    )
    reviews = db.relationship(
        "Review",
        back_populates="user"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'profile_pic': self.profile_image,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'username': self.username,
            'email': self.email,
            "phone": self.phone,
            'role': self.role.to_dict(),
            'full_address': {
                "address": self.address,
                "city": self.city,
                "state": self.state,
                "zip": self.zipcode
            },
            "member_since": self.created_at
        }

    def rev_dict(self):
        return {
            'id': self.id,
            'name': self.firstName + " " + self.lastName,
            'username': self.username,
            'profile_image': self.profile_image
        }

    def user_reviews(self):
        return {
            'id': self.id,
            'reviews': [review.user_dict() for review in self.reviews]
        }

    def comp_dict(self):
        """lazy loaded - no relationship connection"""
        return {
            'id': self.id,
            'name': self.firstName + " " + self.lastName,
            'username': self.username,
            'email': self.email
        }
