from ..models import db, User, Category, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    food = Category(name="Food")
    drink = Category(name="Drink")
    infusedFood = Category(name="Infused-Food", age_restricted=True)
    infusedDrink = Category(name="Infused-Drink", age_restricted=True)
    smokeables = Category(name="Smoke", age_restricted=True)
    merch = Category(name="Merch")
    paraphernalia = Category(name="Paraphernalia", age_restricted=True)

    seedCats = [food, drink, infusedFood, infusedDrink, smokeables, merch, paraphernalia]
    _ = [db.session.add(cat) for cat in seedCats]
    db.session.commit()

    demoFood = Product(
        name="demoFood",
        description="Demo food item",
        price=15,
        units_available=150,
        category_id=food.id,
        added_by=1
    )
    demoDrink = Product(
        name="demoDrink",
        description="Demo drink item",
        price=15,
        units_available=150,
        category_id=drink.id,
        added_by=1
    )
    demoInfFood = Product(
        name="demoInfusedFood",
        description="Demo infused food item",
        price=15,
        units_available=150,
        category_id=infusedFood.id,
        added_by=1
    )
    demoInfDrink = Product(
        name="demoInfusedDrink",
        description="Demo infused drink item",
        price=15,
        units_available=150,
        category_id=infusedDrink.id,
        added_by=1
    )
    demoSmoke = Product(
        name="demoSmoke",
        description="Demo smoke - the greenest of trees",
        price=15,
        units_available=150,
        category_id=smokeables.id,
        added_by=1
    )
    demoMerch = Product(
        name="demoMerch",
        description="Demo merch item",
        price=15,
        units_available=150,
        category_id=merch.id,
        added_by=1
    )
    demoPara = Product(
        name="demoParaphernalia",
        description="Demo paraphernalia item",
        price=15,
        units_available=150,
        category_id=paraphernalia.id,
        added_by=1
    )

    seedProducts = [demoFood, demoDrink, demoInfFood, demoInfDrink, demoMerch, demoSmoke, demoPara]
    _ = [db.session.add(product) for product in seedProducts]

    food.products.extend([seedProducts[0]])
    drink.products.extend([seedProducts[1]])
    infusedFood.products.extend([seedProducts[2]])
    infusedDrink.products.extend([seedProducts[3]])
    smokeables.products.extend([seedProducts[4]])
    merch.products.extend([seedProducts[5]])
    paraphernalia.products.extend([seedProducts[6]])

    db.session.commit()

def undo_products():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM products"))
    db.session.commit()
