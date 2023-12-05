from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user
from .auth_helper import validation_errors_to_error_messages

from ...models import db, User, Wishlist, Favorite, Role
from ...forms import LoginForm, SignUpForm

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
        user = User.query.filter(User.username == form.data['creds']).first()
        login_user(user)
        print("checking auth bullshit! => ", current_user.is_authenticated)
        print("checking is current_user exists => ", current_user.to_dict())
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

        role = Role.query.filter(Role.name == "Member").first()
        roleId = role.id
        payrate = role.payrate

        if data['roleName']:
            """if a roleName was selected and sent - overwrite default Member role"""
            user = User.query.get(current_user.get_id())
            if data['roleName'] == "Employee":
                if user.role.name == "Manager" or user.role.name == "Owner":
                    role = Role.query.filter(Role.name == "Employee").first()
                    roleId = role.id
                    payrate = role.payrate
            elif data['roleName'] == "Manager":
                if user.role.name == "Owner":
                    role = Role.query.filter(Role.name == "Manager").first()
                    roleId = role.id
                    payrate = role.payrate

        if current_user.is_authenticated:
            """check if new employee has a member account by first and last name"""
            user = User.query.filter(User.firstName == data['firstName'] and User.lastName == data['lastName']).first()
            if not user:
                """last resort check if new employee has a member account by first and last name"""
                user = User.query.filter(User.email == data['email']).first()
            if user:
                """if the new emp has member account edit that account, changing role and adding payrate"""
                user.role_id = roleId
                user.pay_rate = payrate
                db.session.commit()
                return user.to_dict()

        """no member account found for emp -> create one"""
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
            phone = data['phone'],
            password = data['password'],
            role_id = roleId,
            pay_rate = payrate
        )

        db.session.add(new_user)
        db.session.commit()

        new_wishlist = Wishlist(user_id = new_user.id)
        new_favorites = Favorite(user_id = new_user.id)
        db.session.add(new_wishlist)
        db.session.add(new_favorites)
        db.session.commit()

        if not current_user.is_authenticated:
            """login new user - IF the user was created by the user and not as a new employee by management/owner"""
            login_user(new_user)
        return new_user.to_dict()
    return { 'errors': validation_errors_to_error_messages(form.errors) }, 401

@auth_routes.route('/unauthorized')
def unauthorized():
    return {'errors': ['Unauthorized']}, 401
