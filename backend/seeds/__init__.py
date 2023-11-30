from flask.cli import AppGroup
from ..models.db import db, environment, SCHEMA

from .users import seed_users, undo_users

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
