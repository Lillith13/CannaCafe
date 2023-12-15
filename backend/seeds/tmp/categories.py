from ...models import db, Category, Product, environment, SCHEMA
from sqlalchemy.sql import text

from .products import seed_products

def seed_categories():
    food = Category(name="Food", age_restricted=False)
    drink = Category(name="Drink", age_restricted=False)
    infusedFood = Category(name="Infused-Food")
    infusedDrink = Category(name="Infused-Drink")
    smokeables = Category(name="Smoke", shippable=True)
    merch = Category(name="Merch", age_restricted=False, shippable=True)
    paraphernalia = Category(name="Paraphernalia", shippable=True)

    seedCats = [food, drink, infusedFood, infusedDrink, smokeables, merch, paraphernalia]
    _ = [db.session.add(cat) for cat in seedCats]
    db.session.commit()

    seedProds = seed_products(seedCats)
    # print(seedProds["seededFoods"])

    food.products.extend(seedProds["seededFoods"])
    drink.products.extend(seedProds["seededDrinks"])
    infusedFood.products.extend(seedProds["seededInfFoods"])
    infusedDrink.products.extend(seedProds["seededInfDrinks"])
    merch.products.extend(seedProds["seededMerch"])
    smokeables.products.extend(seedProds["seededSmokeables"])
    paraphernalia.products.extend(seedProds["seededPara"])

    db.session.commit()

def undo_categories():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM categories"))
    db.session.commit()
