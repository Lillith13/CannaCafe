from ..models import db, Category, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    pass

def undo_users():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM products"))
    db.session.commit()
