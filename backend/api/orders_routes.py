from flask import Blueprint, request
from flask_login import login_required, current_user
from .auth_helper import validation_errors_to_error_messages

from ..models import db, Order, Product

order_routes = Blueprint('orders', __name__, url_prefix="/orders")

@order_routes.route("/", methods=["GET", "POST"])
@login_required
def orders():
    if request.method == "GET":
        orders = Order.query.filter(Order.user_id == current_user.get_id()).all()
        return { "Past_Orders": [order.to_dict() for order in orders] }

    if request.method == "POST":
        cart = request.get_data()
        order = Order(
            user_id = current_user.get_id()
        )
        errors = {}
        for item in cart:
            product = Product.query.get(item.id)

            if product.units_available < item.quantity:
                errors[f"{item.id}"] = validation_errors_to_error_messages({"Low_Availability": f"Item #{item.id} only has {product.units_available} in stock"})
            if product.units_available < 1:
                errors[f"{item.id}"] = validation_errors_to_error_messages({"Sold_Out": f"Item #{item.id} is sold out"})
            if not product:
                errors[f"{item.id}"] = validation_errors_to_error_messages({"Not_Found": f"Item #{item.id} not found"})
            if len(errors):
                return errors

            order.products.append(product)
            product.units_avaiable = product.units_avaiable - item.quantity
        db.session.add(order)
        db.session.commit()
        return { "message": "successful" }
    return

@order_routes.route('/<int:id>')
@login_required
def order(id):
    order = Order.query.get(id)
    if order:
        return { "Order": order.to_dict() }
    return {'errors': validation_errors_to_error_messages({ "Order": "Order not found"})}, 404

@order_routes.route('/<int:orderId>/<int:itemId>', methods=['DELETE'])
@login_required
def processReturn(orderId, itemId):
    product = Product.query.get(itemId)
    inOrder = False
    if product:
        order = Order.query.filter(Order.user_id == current_user.get_id() and Order.id == orderId).first()
        for item in order.products:
            if item.id == itemId:
                inOrder = True
        if not inOrder:
            return { 'errors': validation_errors_to_error_messages({"Bad_Request": "Product not found"})}, 403
        order.product.remove(product)
        db.session.commit()
        return { "message": "successful" }
    return { 'errors': validation_errors_to_error_messages({"Product": "Product doesn't exist"})}, 404
