from flask import Blueprint, request
from flask_login import login_required, current_user

from .auth_helper import validation_errors_to_error_messages

from ...models import db, Order, Product, OrderProduct, User
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

    if request.method == "POST":
        order = Order(
            user_id = current_user.get_id()
        )

        db.session.add(order)
        db.session.commit()
        return { "Order": order.id }
    return

@order_routes.route('/<int:id>', methods=['GET', 'POST', 'PUT', 'DELETE'])
@login_required
def order(id):
    order = Order.query.get(id)

    if request.method == "GET":
        if order:
            return { "Order": order.to_dict() }

    if request.method == "POST":
        form = PlaceOrder()
        form['csrf_token'].data = request.cookies['csrf_token']

        if not order:
            return {'errors': {"Order": "Order not found"}}, 404

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
            print("product price => ", product['price'])
            print("product quantity => ", quantity)
            print("order totals => ", order.total)
            db.session.add(newOrderItem)
            db.session.commit()
            return {"message": "successful"}

        if form.errors:
            return {'errors': validation_errors_to_error_messages(form.errors)}

    if request.method == "PUT":
        # ! For changing shipped and fulfilled dates
        pass

    if request.method == "DELETE":
        print()
        print(order)
        print(request.method)
        print()

        if not order:
            return {'errors': {"Bad_Request": "Order not found"}}, 404
        db.session.delete(order)
        db.session.commit()
        return {'message': "successful"}

@order_routes.route('/<int:orderId>/<int:itemId>', methods=['DELETE'])
@login_required
def processReturn(orderId, itemId):

    orderItem = OrderProduct.query.filter(OrderProduct.order_id == orderId, OrderProduct.product_id == itemId).first()

    if not orderItem:
        return { 'errors': {"Bad_Request": "Product not found"}}, 404

    db.session.delete(orderItem)
    db.session.commit()
    return { "message": "successful" }
