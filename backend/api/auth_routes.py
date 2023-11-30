from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user
from .auth_helper import validation_errors_to_error_messages

from ..models import db, User, Wishlist, Favorite, Role
from ..forms import LoginForm, SignUpForm

auth_routes = Blueprint("auth", __name__)

@auth_routes.route('/')
def authenticate():
    if current_user.is_authenticated:
        return current_user.to_dict()
    return { 'errors': ['Unauthorized'] }

@auth_routes.route('/login', methods=['POST'])
def login():
    form = LoginForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User.query.filter(User.username == form.data['creds'] or User.email == form.data['creds']).first()
        login_user(user)
        return user.to_dict()
    return { 'errors': validation_errors_to_error_messages(form.errors) }, 401

@auth_routes.route('/logout')
def logout():
    logout_user()
    return {'message': 'successful'}

@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_user = User(
            firstName = data['firstName'],
            lastName = data['lastName'],
            birthday = data['birthday'],
            address = data['address'],
            city = data['city'],
            state = data['state'],
            zipcode = data['zipcode'],
            username = data['username'],
            email = data['email'],
            password = data['password'],
        )
        if data['role']:
            role = Role.query.filter(Role.id == int(data['roleId'])).first()
            if current_user:
                user = User.query.get(current_user.get_id())
                if user.role.name == "Manager":
                    new_user.role_id = role.id
                    new_user.pay_rate = role.payrate
                if user.role.name == "Owner":
                    new_user.role_id == role.id
                    new_user.pay_rate = role.payrate
            else:
                new_user.role_id == role.id

        new_wishlist = Wishlist(user_id = new_user.id)
        new_favorites = Favorite(user_id = new_user.id)

        db.session.add(new_user)
        db.session.commit()
        login_user(new_user)
        return new_user.to_dict()
    return { 'errors': validation_errors_to_error_messages(form.errors) }, 401

@auth_routes.route('/unauthorized')
def unauthorized():
    return {'errors': ['Unauthorized']}, 401
