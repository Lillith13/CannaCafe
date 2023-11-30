from flask import Blueprint, request
from flask_login import login_required, current_user, logout_user

from ..models import db, User, Role
from ..forms import EditAccountForm
from .auth_helper import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__, url_prefix="/users")

@user_routes.route('/')
def users():
    users = User.query.all()
    allUsers = { 'users': [{
        "id":user['id'],
        "firstName":user['firstName'],
        "lastName":user['lastName'],
        "username":user['username'],
        "role":user['role'],
        "member_since":user['member_since'
        ]} for user in users
    ]}
    return allUsers

@user_routes.route('/<int:id>')
def user(id):
    user = User.query.get(id)
    return { "user": user.to_dict() }


@user_routes.route('/', methods=["DELETE"])
@login_required
def delAccount():
    user = User.query.filter(User.id == current_user.get_id()).first()
    logout_user()
    db.session.delete(user)
    db.session.commit()
    return { "message": "successful" }


@user_routes.route('/<int:id>', methods=["POST"])
@login_required
def editAccount(id):
    """ edit account details """
    user = User.query.get(id)
    form = EditAccountForm()
    form = {}
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        if user.firstName != data['firstName']:
            user.firstName = data['firstName']
        if user.lastName != data['lastName']:
            user.lastName = data['lastName']
        if user.address != data['address']:
            pass
        if user.city != data['city']:
            pass
        if user.state != data['state']:
            pass
        if user.zipcode != data['zipcode']:
            pass
        if user.email != data['email']:
            pass
        if current_user.get_id() == user.id:
            if data['newpass'] and user.check_password(data['oldpass']):
                user.password = data['newpass']
        if current_user.get_id() != user.id:
            thirdParty = User.query.get(current_user.get_id())
            if thirdParty.role != "Manager" or thirdParty.role != "Owner":
                return {'errors': validation_errors_to_error_messages({"Not_Allowed": "You do not have permission to perform this action"})}, 403
            if thirdParty.role == "Manager" and user.role != "Owner":
                return {'errors': validation_errors_to_error_messages({"Not_Allowed": "You do not have permission to perform this action"})}, 403
            role = Role.query.filter(Role.name == int(data['role'])).first
            user.role_id = role.id
            if role.name == "Employee" or role.name == "Manager":
                user.pay_rate = role.payrate
        db.session.commit()
        return user.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
