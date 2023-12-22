from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user
from .auth_helper import validation_errors_to_error_messages

from ...models import db, User, Wishlist, Favorite, Role
from ...forms import LoginForm, SignUpForm
from .aws_helper import get_unique_filename, upload_file_to_s3, remove_file_from_s3

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

        role = None
        roleId = 1
        payrate = 0

        if data['role']:
            """if a roleName was selected and sent - overwrite default Member role"""
            user = User.query.get(current_user.get_id())

            if data['role'] == "Employee":
                if user.role.name == "Manager" or user.role.name == "Owner":
                    role = Role.query.filter(Role.name == "Employee").first()
                    roleId = role.id
                    payrate = role.payrate
            elif data['role'] == "Manager":
                if user.role.name == "Owner":
                    role = Role.query.filter(Role.name == "Manager").first()
                    roleId = role.id
                    payrate = role.payrate
            else:
                role = Role.query.filter(Role.name == "Member").first()
                roleId = role.id
                payrate = role.payrate

        if current_user.get_id():
            """check if new employee has a member account by first and last name"""
            emp = User.query.filter(User.firstName == data['firstName'] and User.lastName == data['lastName']).first()
            print()
            print(emp.to_dict())
            print()
            if not emp:
                """last resort check if new employee has a member account by first and last name"""
                emp = User.query.filter(User.email == data['email']).first()
            if emp:
                """if the new emp has member account edit that account, changing role and adding payrate"""
                emp.role_id = roleId
                emp.pay_rate = payrate
                db.session.commit()
                print(emp.to_dict())
                return emp.to_dict()

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
        if data['profile_pic']:
            prev_img = data['profile_pic']
            filename = prev_img.filename
            prev_img.filename = get_unique_filename(filename)
            upload = upload_file_to_s3(prev_img)
            if 'url' not in upload:
                return upload
            new_user.profile_image = upload['url']

        db.session.add(new_user)
        db.session.commit()

        new_wishlist = Wishlist(user_id = new_user.id)
        new_favorites = Favorite(user_id = new_user.id)
        db.session.add(new_wishlist)
        db.session.add(new_favorites)
        db.session.commit()

        if not current_user.get_id():
            """login new user - IF the user was created by the user and not as a new employee by management/owner"""
            login_user(new_user)
        return new_user.to_dict()

    return { 'errors': validation_errors_to_error_messages(form.errors) }, 401

@auth_routes.route('/unauthorized')
def unauthorized():
    return {'errors': ['Unauthorized']}, 401
