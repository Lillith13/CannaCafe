from flask import Blueprint, request
from flask_login import login_required, current_user

from .auth_helper import validation_errors_to_error_messages

from ...models import db, Order, ProductImage, Product, OrderProduct, User
from ...forms import PlaceOrder

order_routes = Blueprint('orders', __name__, url_prefix="/orders")

@order_routes.route("/", methods=["GET", "POST"])
@login_required
def orders():
    if request.method == "GET":
        orderList = []
        orders = Order.query.filter(Order.user_id == current_user.get_id()).all()
        # users = User.query.all()
        for order in orders:
            o = order.to_dict()
            targetUser = User.query.get(o['user_id'])
            o['user'] = targetUser.username
            for product in o['products']:
                # print("product => ", product['id'])
                prodId = product['id']
                # print("o to dict => ", o['id'])
                orderId = o['id']
                tmp = OrderProduct.query.filter(OrderProduct.product_id == prodId and OrderProduct.order_id == orderId).first()
                product['quantity'] = tmp.quantity
                # print(product)
            orderList.append(o)
        return {"Past_Orders": orderList}

    return None


    if request.method == "POST":
        order = Order(
            user_id = current_user.get_id()
        )

        db.session.add(order)
        db.session.commit()
        return { "Order": order.id }
    return

@order_routes.route('/<int:id>', methods=['GET', 'POST'])
@login_required
def order(id):
    if request.method == "GET":
        order = Order.query.get(id)
        if order:
            return { "Order": order.to_dict() }

    if request.method == "POST":
        form = PlaceOrder()
        form['csrf_token'].data = request.cookies['csrf_token']

        order = Order.query.get(id)
        if not order:
            return {'errors': [{"Order": "Order not found"}]}, 404

        if form.validate_on_submit():
            data = form.data
            itemId = data['itemId']
            quantity = data['quantity']

            prod = Product.query.get(itemId)
            product = prod.order_dict()
            units_available = product['units_available']

            if not prod:
                return {"errors": [{"Not_Found": f"Item #{data['itemId']} not found"}]}, 404

            if int(units_available) < quantity:
                return {'errors': [{"Low_Availability": f"Item #{int(data['itemId'])} only has {product.units_available} in stock"}]}, 400

            if int(units_available) < 1:
                return {'errors': [{"Sold_Out": f"Item #{int(data['itemId'])} is sold out"}]}, 400

            newOrderItem = OrderProduct(
                product_id = itemId,
                order_id = id,
                quantity = quantity
            )
            product['units_available'] = units_available - quantity
            order.total += product['price'] * quantity
            db.session.add(newOrderItem)
            db.session.commit()
            return {"message": "successful"}

        if form.errors:
            return {'errors': validation_errors_to_error_messages(form.errors)}
        return None

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
