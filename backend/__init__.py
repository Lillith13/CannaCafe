import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User

from .api import auth_routes, user_routes, timecard_routes, product_routes, wishlist_routes, favorite_routes, order_routes, category_routes, review_routes, complaint_routes

from .seeds import seed_commands
from .config import Config

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')

app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(timecard_routes, url_prefix="/api/timecard")
app.register_blueprint(product_routes, url_prefix='/api/products')
app.register_blueprint(wishlist_routes, url_prefix='/api/wishlist')
app.register_blueprint(favorite_routes, url_prefix='/api/favorites')
app.register_blueprint(order_routes, url_prefix='/api/orders')
app.register_blueprint(category_routes, url_prefix='/api/catergories')
app.register_blueprint(review_routes, url_prefix='/api/reviews')
app.register_blueprint(complaint_routes, url_prefix='/api/complaints')

db.init_app(app)
Migrate(app, db)

CORS(app)

login = LoginManager(app)
login.login_view = 'auth.unauthorized'

@login.user_loader
def load_user(id):
    return User.query.get(id)

@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)

@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='strict' if os.environ.get('FLASK_ENV') == 'production' else None, httponly=True
    )
    return response

@app.route('/api/docs')
def api_help():
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = {rule.rule: [[method for method in rule.methods if method in acceptable_methods], app.view_functions[rule.endpoint], __doc__] for rule in app.url_map.iter_rules() if rule.endpoint != 'static'}
    return route_list

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')