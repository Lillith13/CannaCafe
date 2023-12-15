from flask import Blueprint, request
from flask_login import login_required, current_user, logout_user

from ...models import db, User, Role, Review
from ...forms import EditAccountForm
from .aws_helper import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from .auth_helper import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__, url_prefix="/users")

@user_routes.route('/')
def get_employees():
    empRole = Role.query.filter(Role.name == "Employee").first()
    employees = User.query.filter(User.role_id == empRole.id).all()

    managerRole = Role.query.filter(Role.name == "Manager").first()
    managers = User.query.filter(User.role_id == managerRole.id).all()

    ownerRole = Role.query.filter(Role.name == "Owner").first()
    owners = User.query.filter(User.role_id == ownerRole.id).all()

    currUser = User.query.get(current_user.get_id())

    allEmployees = {
        "Employees": [employee.to_dict() for employee in employees],
        "Managers": [manager.to_dict() for manager in managers],
        "Owners": [owner.to_dict() for owner in owners]
    }
    return allEmployees

@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return { "User": user.to_dict() }


@user_routes.route('/<int:userId>', methods=["DELETE"])
@login_required
def delAccount(userId):
    user = User.query.get(userId)
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
    form['csrf_token'].data = request.cookies['csrf_token']
    print("edit route before validator => ", form.data)

    if form.validate_on_submit():
        data = form.data
        # print("edit route validated form data => ", data)
        if data['profile_pic']:
            img = data['profile_pic']
            if(user.profile_image and user.profile_image != 'undefined'):
                remove_file_from_s3(user.profile_image)

            filename = img.filename
            img.filename = get_unique_filename(filename)
            upload = upload_file_to_s3(img)
            if 'url' not in upload:
                return upload
            user.profile_image = upload['url']

        if user.firstName != data['firstName']:
            user.firstName = data['firstName']

        if user.lastName != data['lastName']:
            user.lastName = data['lastName']

        if user.address != data['address']:
            user.address = data['address']

        if user.city != data['city']:
            user.city = data['city']

        if user.state != data['state']:
            user.state = data['state']

        if user.zipcode != data['zipcode']:
            user.zipcode = data['zipcode']

        # if user.email != data['email']:
        #     user.email = data['email']

        if user.phone != data['phone']:
            user.phone = data['phone']

        if int(current_user.get_id()) == int(user.id):
            if data['newpassword'] and user.check_password(data['oldpassword']):
                user.password = data['newpassword']

        if int(current_user.get_id()) != int(user.id):
            thirdParty = User.query.get(current_user.get_id())

            if thirdParty.role.name != "Manager" and thirdParty.role.name != "Owner":
                print("is this where the error is hitting? 1")
                return {'errors': validation_errors_to_error_messages({"Not_Allowed": "You do not have permission to perform this action"})}, 403

            if thirdParty.role.name == "Manager" and user.role.name != "Owner":
                print("is this where the error is hitting? 2")
                return {'errors': validation_errors_to_error_messages({"Not_Allowed": "You do not have permission to perform this action"})}, 403

            role = Role.query.filter(Role.name == data['role']).first()
            user.role_id = role.id
            if not role.name == "Member":
                user.pay_rate = role.payrate
            if role.name == "Member":
                user.pay_rate = None
        db.session.commit()
        return user.to_dict()
    print(form.errors)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@user_routes.route('/reviews')
def userReviews():
    reviews = Review.query.filter(Review.user_id == current_user.get_id()).all()
    if not len(reviews):
        return {"Reviews": None}
    return { "Reviews": [review.user_dict() for review in reviews]}
