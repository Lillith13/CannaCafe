from flask.cli import AppGroup
from ..models.db import db, environment, SCHEMA

from .roles import seed_roles
from .users import undo_users

from .categories import seed_categories
from .products import undo_products


# * Intentially not seeding some tables

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_products()
        undo_users()
    seed_roles()
    seed_categories()

@seed_commands.command('undo')
def undo():
    undo_products()
    undo_users()
