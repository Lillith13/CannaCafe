from ..models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text

from .products import seed_products

def seed_categories():
    food = Category(name="Food", age_restricted=False)
    drink = Category(name="Drink", age_restricted=False)
    infusedFood = Category(name="Infused-Food")
    infusedDrink = Category(name="Infused-Drink")
    smokeables = Category(name="Smoke", shippable=True)
    merch = Category(name="Merch", age_restricted=False, shippable=True)
    paraphenalia = Category(name="Paraphenalia", shippable=True)

    seedCats = [food, drink, infusedFood, infusedDrink, smokeables, merch, paraphenalia]
    _ = [db.session.add(cat) for cat in seedCats]

    db.session.commit()

    seed_products(food, drink, infusedFood, infusedDrink, smokeables, merch, paraphenalia)
