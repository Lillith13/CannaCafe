from ..models import db, User, Category, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
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

    demoFood = Product(
        name="BLT",
        description="Classic BLT",
        price=15,
        units_available=150,
        preview_image="https://www.southernliving.com/thmb/ZHPbfOxGS67POrrBjc6X0LYnizc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/the-sl-blt-01-4X3-b322a15a36fc436abf2796092283a40c.jpg",
        preview_image_name="BLT",
        category_id=food.id,
        added_by=1
    )
    demoDrink = Product(
        name="Coffee",
        description="Demo drink item",
        price=15,
        units_available=150,
        preview_image="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p.jpg",
        preview_image_name="Coffee",
        category_id=drink.id,
        added_by=1
    )
    demoInfFood = Product(
        name="Delta-9 Brownies",
        description="The specialist of special brownies",
        price=15,
        units_available=150,
        preview_image="https://www.alchimiaweb.com/blogen/wp-content/uploads/2021/10/b2-1024x682-1-910x606.jpg",
        preview_image_name="CannaBrownies",
        category_id=infusedFood.id,
        added_by=1
    )
    demoInfDrink = Product(
        name="CBG Coffee",
        description="The best of both worlds for a great start to your day. Coffeine to boost your energy, CBG to super charge and protect your brain!",
        price=15,
        units_available=150,
        preview_image="https://i0.wp.com/blog.beangenius.com/wp-content/uploads/2018/04/coffee-cannabis.jpg",
        preview_image_name="CBD Coffee",
        category_id=infusedDrink.id,
        added_by=1
    )
    demoSmoke = Product(
        name="CBD & CBG Flowers",
        description="A smoke for brain health and anxiety relief",
        price=15,
        units_available=150,
        preview_image="https://www.justbob.shop/wp-content/uploads/2023/08/Cannabis-cbd-buds-of-outdoor-buds.jpg",
        preview_image_name="CBD&CBG Flowers",
        category_id=smokeables.id,
        added_by=1
    )
    demoMerch = Product(
        name="Cannabis Tee",
        description="Cannabis Tee",
        price=15,
        units_available=150,
        preview_image="https://i.ebayimg.com/images/g/BpMAAOSw1WJixcyE/s-l500.jpg",
        preview_image_name="CannabisTee",
        category_id=merch.id,
        added_by=1
    )
    demoPara = Product(
        name="Glass Bubbler",
        description="Bubbliest of bubblers",
        price=15,
        units_available=150,
        preview_image="https://www.grasscity.com/media/catalog/product/cache/991238b50a055d049ec701e2668bf240/m/i/mini-bubbler-glass-pipe-5.5_media-1-2.jpg",
        preview_image_name="GlassBubbler",
        category_id=paraphernalia.id,
        added_by=1
    )

    seedProducts = [demoFood, demoDrink, demoInfFood, demoInfDrink, demoMerch, demoSmoke, demoPara]
    _ = [db.session.add(product) for product in seedProducts]

    food.products.extend([seedProducts[0]])
    drink.products.extend([seedProducts[1]])
    infusedFood.products.extend([seedProducts[2]])
    infusedDrink.products.extend([seedProducts[3]])
    merch.products.extend([seedProducts[4]])
    smokeables.products.extend([seedProducts[5]])
    paraphernalia.products.extend([seedProducts[6]])

    db.session.commit()

def undo_products():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM products"))
    db.session.commit()
