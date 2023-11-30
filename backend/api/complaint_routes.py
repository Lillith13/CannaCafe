from flask import Blueprint, request
from flask_login import login_required, current_user
from .auth_helper import validation_errors_to_error_messages
from datetime import date

from ..models import db, Complaint, User
from ..forms import ComplaintForm

complaint_routes = Blueprint('/complaints', __name__, url_prefix="/complaints")

@complaint_routes.route("/")
@login_required
def getComplaints():
    user = User.query.filter(User.id == current_user.get_id()).first()
    if user.role == "Manager":
        """Get ALL complaints"""
        complaints = Complaint.query.all()
        if not len(complaints):
            return { "Complaints": None }
        return { "Complaints": [complaint.to_dict() for complaint in complaints]}

    """Get ONLY the user's reviews"""
    complaints = Complaint.query.filter(Complaint.user_id == current_user.get_id())
    if not len(complaints):
        return { "Complaints": None }
    return {"Complaints": [complaint.to_dict() for complaint in complaints]}

@complaint_routes.route("/<int:id>")
@login_required
def getComplaint(id):
    user = User.query.filter(User.id == current_user.get_id()).first()

    if user.role == "Manager":
        complaint = Complaint.query.get(id)
        if not complaint:
            return { 'errors': validation_errors_to_error_messages({"Bad_Request": "Complaint not found"}) }, 400
        return { "Complaint": complaint.to_dict() }

    complaint = Complaint.query.filter(Complaint.id == id and Complaint.user_id == current_user.get_id()).first()

    if not complaint:
        return { 'errors': validation_errors_to_error_messages({"Bad_Request": "Complaint not found"}) }, 400

    return { "Complaint": complaint.to_dict() }

@complaint_routes.route("/", methods=["POST", "PUT", "DELETE"])
@login_required
def handleComplaints():
    if request.method == "POST" or request.method == "PUT":
        form = ComplaintForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if request.method == "POST":
            if form.validate_on_submit():
                data = form.data
                new_complaint = Complaint(
                    user_id = current_user.get_id(),
                    product_id = data['productId'],
                    complaint = data['complaint']
                )
                return {"message": "successful" }
            return {'errors': validation_errors_to_error_messages(form.errors)}

        if request.method == "PUT":
            if form.validate_on_submit():
                data = form.data
                id = request.get_data()
                complaint = Complaint.query.filter(Complaint.id == id).first()
                if not complaint:
                    return {'errors': validation_errors_to_error_messages({"Not_Found": "Complaint not found"})}, 404
                if complaint.reviewed:
                    return {'errors': validation_errors_to_error_messages({"Not_Allowed": "Your complaint has already been reviewed"})}, 403
                if complaint.user_id != current_user.get_id():
                    user = User.query.get(current_user.get_id())
                    if user.role != "Manager":
                        return {'errors': validation_errors_to_error_messages({"Not_Authorized": "You are not authorized to perform this action"})}, 403
                    if data['reviewed']:
                        complaint.reviewed = data['reviewed']
                        complaint.reviewed_at = date.today()
                    if data['resolved']:
                        complaint.resolved = data['resolved']
                        complaint.resolved = date.today()
                if complaint.productId != data['productId']:
                    complaint.productId = data['productId']
                if complaint.complaint != data['complaint']:
                    complaint.complaint = data['complaint']
                db.session.commit()

            return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    if request.method == "DELETE":
        id = request.get_data()
        complaint = Complaint.query.filter(Complaint.id == id).first()
        if not complaint:
            return {'errors': validation_errors_to_error_messages({"Not_Found": "Complaint not found"})}, 404
        if complaint.user_id != current_user.get_id():
            return {'errors': validation_errors_to_error_messages({"Not_Allowed": "Only the customer who placed the complaint can delete it"})}, 403
        db.session.delete(complaint)
        db.session.commit()

    return { 'errors': validation_errors_to_error_messages({"Bad_Request": "Bad_Request"})}, 400

# * At a later date add ability to comment on and add images to complaints
