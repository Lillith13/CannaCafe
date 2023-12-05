from flask import Blueprint, request
from flask_login import login_required, current_user
from .auth_helper import validation_errors_to_error_messages

from ...models import db, Product, Category, User, ProductImage
from ...forms import ProductForm
from .aws_helper import get_unique_filename, upload_file_to_s3, remove_file_from_s3

product_routes = Blueprint('products', __name__, url_prefix="/products")

@product_routes.route('/')
@login_required
def allProducts():
    products = Product.query.all()
    safe_products = []
    user = User.query.get(current_user.get_id())
    if not user:
        for product in products:
            prod = product.to_dict()
            category = product.category
            catDict = category[0].to_dict()
            if not catDict["age_restricted"]:
                safe = {
                    "id": prod["id"],
                    "name": prod['name'],
                    "category": catDict,
                    "price": prod["price"],
                    "description": prod["description"],
                    "units_available": prod["units_available"],
                    "previewImg": prod["previewImg"],
                    "otherImgs": prod["otherImgs"]
                }
                safe_products.append(safe)
    else:
        for product in products:
            prod = product.to_dict()
            category = product.category
            catDict = category[0].to_dict()
            safe = {
                "id": prod["id"],
                "name": prod['name'],
                "category": catDict,
                "price": prod["price"],
                "description": prod["description"],
                "units_available": prod["units_available"],
                "previewImg": prod["previewImg"],
                "otherImgs": prod["otherImgs"]
            }
            safe_products.append(safe)
    return { 'Products': safe_products }

@product_routes.route('/<string:path>')
def allProducts_byPath(path):
    products = Product.query.all()
    safe_products = []
    if path == "menu":
        for product in products:
            prod = product.to_dict()
            category = product.category
            catDict = category[0].to_dict()
            if not catDict["shippable"]:
                safe = {
                    "id": prod["id"],
                    "name": prod['name'],
                    "category": catDict,
                    "price": prod["price"],
                    "description": prod["description"],
                    "units_available": prod["units_available"],
                    "previewImg": prod["previewImg"],
                    "otherImgs": prod["otherImgs"]
                }
                safe_products.append(safe)
    else:
        for product in products:
            prod = product.to_dict()
            category = product.category
            catDict = category[0].to_dict()
            if catDict["shippable"]:
                safe = {
                    "id": prod["id"],
                    "name": prod['name'],
                    "category": catDict,
                    "price": prod["price"],
                    "description": prod["description"],
                    "units_available": prod["units_available"],
                    "previewImg": prod["previewImg"],
                    "otherImgs": prod["otherImgs"]
                }
                safe_products.append(safe)
    return { 'Products': safe_products }


@product_routes.route('/<int:id>')
def specificProduct(id):
    product = Product.query.get(id)
    if not product:
        return { 'errors': validation_errors_to_error_messages({"Product": "Product doesn't exist"})}, 404
    return product.to_dict()


@product_routes.route('/', methods=["POST", "PUT", "DELETE"])
@login_required
def productSubmits():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    user = User.query.get(current_user.get_id())
    if user['role'] != "Manager":
        return {'errors': validation_errors_to_error_messages({"Not_Authorized": "You do not have the correct role permissions to perform this action"})}, 401

    if form.validate_on_submit():
        data = form.data

        if request.method == "POST":
            prev_img = data['preview']
            filename = prev_img.filename
            prev_img.filename = get_unique_filename(prev_img.filename)
            upload = upload_file_to_s3(prev_img)
            cat = Category.query.filter(Category.name == data['category']).first()
            new_product = Product(
                name = data['name'],
                description = data['description'],
                price = data['price'],
                units_availble = data['units_available'],
                preview_image = upload['url'],
                preview_image_name = filename,
                category_id = cat['id'],
                added_by = current_user.get_id()
            )
            db.session.add(new_product)
            db.session.commit()
            return { "message": "success" }

        if request.method == "PUT":
            id = request.get_data()
            product = Product.query.get(id)
            if data['name'] != product.name:
                product.name = data['name']

            if data['description'] != product.description:
                product.description = data['description']

            if data['price'] != product.price:
                product.price = data['price']

            if data['units_available'] != product.units_available:
                product.units_available = data['units_available']

            if data['preview'] != product.preview_image:
                prev_img = data['preview']
                filename = prev_img.filename
                prev_img.filename = get_unique_filename(prev_img.filename)
                upload = upload_file_to_s3(prev_img)
                product.preview_image = upload['url']
                product.preview_image_name = filename

            if data['category'] != product.category:
                cat = Category.query.filter(Category.name == data['category']).first()
                product.category_id = cat.id

            product.added_by = current_user.get_id()
            db.session.commit()
            return { "message": "success" }

    if request.method == "DELETE":
        id = request.get_data()
        product = Product.query.get(id)
        if not product:
            return {"errors": validation_errors_to_error_messages({"Not_Found" : "No product with that id found"})}, 404
        _=[remove_file_from_s3(image.url) for image in product.images]
        db.session.delete(product)
        db.session.commit()

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    return {'errors': validation_errors_to_error_messages({"Bad_Request": "Bad Request"})}, 400

@product_routes.route("/images", methods=["POST", "DELETE"])
@login_required
def productImageSubmits():
    id = request.get_data()
    form = ProductImage()
    form['csrf_token'].data = request.cookies['csrf_token']

    if request.method == "POST":
        if form.validate_on_request:
            """if post the id will be a product id"""
            product = Product.query.get(id)
            if not product:
                return {'errors': validation_errors_to_error_messages({"Not_Found" : "No product with that id found"})}, 404

            data = form.data
            img = data['image']
            filename = img.filename
            img.filename = get_unique_filename(img.filename)
            upload = upload_file_to_s3(img)

            if 'url' not in upload:
                return upload
            image = ProductImage(
                url = upload['url'],
                product_id = id,
                image_name = filename
            )
            product.images.append(image)
            db.session.add(image)
            db.session.commit()
            return { "message": "successful" }

        if form.errors:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    if request.method == "DELETE":
        """if delete the id will be an image id"""
        image = ProductImage.query.get(id)
        remove_file_from_s3(image.url)
        db.session.delete(image)
        db.session.commit()
        return {"message": "successful"}

    return {'errors': validation_errors_to_error_messages({"Bad_Request": "Bad Request"})}, 400
