from flask import Blueprint, request
from flask_login import login_required, current_user, logout_user

from ..models import db, User
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
        user.firstName = data["firstName"]
        user.lastName = data["lastName"]
        user.email = data["email"]
        db.session.commit()
        return user.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
