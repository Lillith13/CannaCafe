from flask.cli import AppGroup
from ..models.db import db, environment, SCHEMA

from .errything import seed_errything, undo_errything


# * Intentially not seeding some tables

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_errything()
    seed_errything()

@seed_commands.command('undo')
def undo():
    undo_errything()
