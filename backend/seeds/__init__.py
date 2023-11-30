from flask.cli import AppGroup
from ..models.db import db, environment, SCHEMA

# * user seeds also contains role seeds
from .users import seed_users, undo_users
# * products seeds also contains category seeds

# * Intentially not seeding some tables

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_users()
        pass
    seed_users()

@seed_commands.command('undo')
def undo():
    undo_users()
