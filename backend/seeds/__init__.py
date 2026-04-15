from flask.cli import AppGroup
from ..models.db import db, environment, SCHEMA

from .roles import seed_roles
from .users import undo_users

from .categories import seed_categories
from .products import undo_products
from .user_interactions import seed_fake_user_interactions, undo_fake_user_interactions


# * Intentially not seeding some tables

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_products()
        undo_users()
        undo_fake_user_interactions()
    seed_roles() # -> seed_users() -> seed_wishlists() & seed_favorites()
    seed_categories() # -> seed_products() -> seed_product_images()
    seed_fake_user_interactions() # -> seed_orders() -> seed_order_items() && seed_reviews() && seed_favorites() && seed_wishlists()


    # seed_timecards() -> seed_timecard_entries() !!! Need to alter how timecards are displayed (indv day vs weekly vs biweekly vs montly - give user options) and how timecard entries are created (allow user to create timecard entry without creating a timecard first, then assign to timecard when timecard is created)

@seed_commands.command('undo')
def undo():
    undo_products()
    undo_users()
    undo_fake_user_interactions()

    # undo_timecards() -> undo_timecard_entries()
