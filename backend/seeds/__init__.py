from flask.cli import AppGroup
from ..models.db import db, environment, SCHEMA

from .roles import seed_roles
from .users import undo_users

from .categories import seed_categories
from .products import undo_products
from .user_interactions import seed_fake_user_interactions, undo_fake_user_interactions
from .timecards import seed_payStubs, undo_payStubs


# * Intentially not seeding some tables

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_payStubs()
        undo_fake_user_interactions()
        undo_products()
        undo_users()
    seed_roles() # -> seed_users() -> seed_wishlists() & seed_favorites()
    seed_categories() # -> seed_products() -> seed_product_images()
    seed_fake_user_interactions() # -> seed_orders() -> seed_order_items() && seed_reviews() && seed_favorites() && seed_wishlists()
    seed_payStubs()

@seed_commands.command('undo')
def undo():
    undo_payStubs()
    undo_fake_user_interactions()
    undo_products()
    undo_users()
