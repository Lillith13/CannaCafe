from flask.cli import AppGroup
from ..models.db import db, environment, SCHEMA

from .roles import undo_roles
# * seed_roles() called by seed_staff b/c staff seeds require some info sent from roles
from .users import seed_users, undo_users
# * wishlists and favorites seeded & unseeded in its respective user seed (staff wishs/faves vs member wishs/faves)

from .products import undo_products
# * seed_categories() called by seed_products b/c product seeds require some info sent from categories
from .categories import seed_categories, undo_categories

# * Intentially not seeding some tables

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_products()
        undo_categories()
        undo_roles()
        undo_users()
    seed_users()
    seed_categories()

@seed_commands.command('undo')
def undo():
    undo_products()
    undo_categories()
    undo_roles()
    undo_users()
