from flask.cli import AppGroup
from ..models.db import db, environment, SCHEMA

# ! Import seed files

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    if environment == 'production':
        # * Undo Seeds
        pass
    # * seed

@seed_commands.command('undo')
def undo():
    # * Undo seeds
    pass
