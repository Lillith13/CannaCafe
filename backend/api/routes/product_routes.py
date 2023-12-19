from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from .auth_helper import validation_errors_to_error_messages

from ...models import db, Product, Category, User, ProductImage, Review
from ...forms import ProductForm, ReviewForm
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
            category = prod['category']
            if not category["age_restricted"]:
                prod['category'] = category
                safe_products.append(prod)
    else:
        for product in products:
            prod = product.to_dict()
            category = prod['category']
            prod['category'] = category
            safe_products.append(prod)
    print({ 'Products': safe_products })
    return { 'Products': safe_products }

@product_routes.route('/<string:path>')
def allProducts_byPath(path):
    products = Product.query.all()
    safe_products = []
    if path == "menu":
        for product in products:
            prod = product.to_dict()
            category = prod['category']
            # print(category)
            if not category["shippable"]:
                prod['category'] = category
                safe_products.append(prod)
    else:
        for product in products:
            prod = product.to_dict()
            category = prod['category']
            # print(category)
            if category["shippable"]:
                prod['category'] = category
                safe_products.append(prod)
    print(safe_products)
    return { 'Products': safe_products }

@product_routes.route('/<int:id>/reviews')
def itemReviews(id):
        reviews = Review.query.filter(Review.product_id == id).all()
        print("reviews => ", reviews)
        if not len(reviews):
            return { "Reviews": None }
        return { "Reviews": [review.prod_dict() for review in reviews] }

@product_routes.route('/<int:id>/reviews', methods = ["POST"])
def createReview(id):
    if request.method == 'POST':
        form = ReviewForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        # print(" ")
        # print("form data before validate => ", form.data)
        # print(" ")

        if form.validate_on_submit():
            data = form.data
            # print(" ")
            # print("form data => ", data)
            # print(" ")

            userId = int(current_user.get_id())

            new_review = Review(
                product_id = id,
                user_id = userId,
                review = data['rev'],
                rating = data['rating']
            )
            db.session.add(new_review)
            db.session.commit()

        if form.errors:
            return {'errors': validation_errors_to_error_messages(form.errors)}
        # if not reviews:
        #     return { "Reviews": None }
        return { "message": "successful" }



@product_routes.route('/<int:id>')
def specificProduct(id):
    product = Product.query.get(id)
    if not product:
        return { 'errors': validation_errors_to_error_messages({"Product": "Product doesn't exist"})}, 404
    prodDict = product.to_dict()
    if isinstance(prodDict['category'], list):
        prodDict['category'] = prodDict['category'][0]
    return prodDict


@product_routes.route('/', methods=["POST", "PUT", "DELETE"])
@login_required
def productSubmits():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
            data = form.data

            if request.method == "POST":
                prev_img = data['preview']
                filename = prev_img.filename
                prev_img.filename = get_unique_filename(filename)
                upload = upload_file_to_s3(prev_img)
                cat = Category.query.filter(Category.name == data['category']).first()
                if 'url' not in upload:
                    return upload
                new_product = Product(
                    name = data['name'],
                    description = data['description'],
                    price = data['price'],
                    units_available = data['units_available'],
                    preview_image = upload['url'],
                    preview_image_name = filename,
                    category_id = cat.id,
                    added_by = current_user.get_id()
                )
                cat.products.extend([new_product])
                db.session.add(new_product)
                db.session.commit()

                return { "message": "success" }

            if request.method == "PUT":
                print("edit form data => ", data)
                id = data['productId']
                product = Product.query.get(id)
                if data['name'] != product.name:
                    product.name = data['name']

                if data['description'] != product.description:
                    product.description = data['description']

                if data['price'] != product.price:
                    product.price = data['price']

                if data['units_available'] != product.units_available:
                    product.units_available = data['units_available']

                if data['preview']:
                    prev_img = data['preview']
                    remove_file_from_s3(product.preview_image)

                    filename = prev_img.filename
                    prev_img.filename = get_unique_filename(prev_img.filename)
                    upload = upload_file_to_s3(prev_img)
                    if 'url' not in upload:
                        return upload
                    product.preview_image = upload['url']
                    product.preview_image_name = filename

                print("product category in edit product backend route => ", product.category)
                if data['category'] != product.category[0].name:
                    cat = Category.query.filter(Category.name == data['category']).first()
                    product.category_id = cat.id

                product.added_by = current_user.get_id()
                db.session.commit()
                return { "message": "success" }

    if request.method == "DELETE":
            data = request.get_data().decode( "utf-8" )
            # print("parsed data from request => ", int(data))
            product = Product.query.get(int(data))
            if not product:
                return {"errors": validation_errors_to_error_messages({"Not_Found" : "No product with that id found"})}, 404
            remove_file_from_s3(product.preview_image)
            db.session.delete(product)
            db.session.commit()
            return {'message': 'successful'}

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    return {'errors': validation_errors_to_error_messages({"Bad_Request": "Bad Request"})}, 400
