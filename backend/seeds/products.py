from ..models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
import random

fake = Faker()

def createFoods(category, staffIds):
    foods = []

    demoFoodImages = {
        "BLT": {
            "imageName": "sandwhich",
            "imageUrl": "https://www.southernliving.com/thmb/ZHPbfOxGS67POrrBjc6X0LYnizc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/the-sl-blt-01-4X3-b322a15a36fc436abf2796092283a40c.jpg"
        },
        "PB and Banana": {
            "imageName": "sandwhich",
            "imageUrl": "https://www.godairyfree.org/wp-content/uploads/2013/02/ff-spiced-pb-sandwich-2.jpg",
        },
        "Egg Sandwhich": {
            "imageName": "sandwhich",
            "imageUrl": "https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2021/12/egg1-1200x675.jpg"
        },
        "Chicken Salad": {
            "imageName": "salad",
            "imageUrl": "https://www.dinneratthezoo.com/wp-content/uploads/2020/12/grilled-chicken-salad-4.jpg"
        },
        "Cookie": {
            "imageName": "snacks",
            "imageUrl": "https://publish.purewow.net/wp-content/uploads/sites/2/2021/10/giant-cookie-trend-last-crumb.jpg"
        },
        "Danish": {
            "imageName": "snacks",
            "imageUrl": "https://www.sugarsaltmagic.com/wp-content/uploads/2021/07/How-to-make-Danish-Pastry-from-scratch-5-500x500.jpg"
        },
        "Muffin": {
            "imageName": "snacks",
            "imageUrl": "https://bromabakery.com/wp-content/uploads/2018/06/Anything-But-Basic-Muffin-Recipe-1067x1600.webp"
        },
        "Apple Turnover": {
            "imageName": "snacks",
            "imageUrl": "https://carlsbadcravings.com/wp-content/uploads/2022/10/apple-turnovers-9a.jpg"
        },
        "Chocolate Crescent": {
            "imageName": "snacks",
            "imageUrl": "https://sallysbakingaddiction.com/wp-content/uploads/2014/08/20-Minute-Chocolate-Croissants-5.jpg"
        },
        "Stuffed Crust Pizza Bites": {
            "imageName": "snacks",
            "imageUrl": "https://spicysouthernkitchen.com/wp-content/uploads/2022/03/Stuffed-Crust-Pizza-Snacks-Feature.jpg"
        }
    }
    demoFoodNames = ["BLT", "PB and Banana", "Egg Sandwhich", "Chicken Salad", "Cookie", "Danish", "Muffin", "Apple Turnover", "Chocolate Crescent", "Stuffed Crust Pizza Bites"]
    for foodName in demoFoodNames:
        formattedFoodName = "-".join(foodName.split(" "))
        if demoFoodImages[f'{foodName}']["imageName"] == 'snacks':
            demoProduct = Product(
                name=foodName,
                description=fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
                price=round(float(random.uniform(0.99, 2.99)), 2),
                units_available=random.randint(1, 1000),
                preview_image=demoFoodImages[f'{foodName}']["imageUrl"],
                preview_image_name=demoFoodImages[f'{foodName}']["imageName"] + f'_{formattedFoodName}',
                category_id=category.id,
                added_by=random.choice(staffIds)
            )
        else:
            demoProduct = Product(
                name=foodName,
                description=fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
                price=round(float(random.uniform(4.99, 7.99)), 2),
                units_available=random.randint(1, 1000),
                preview_image=demoFoodImages[f'{foodName}']["imageUrl"],
                preview_image_name=demoFoodImages[f'{foodName}']["imageName"] + f'_{formattedFoodName}',
                category_id=category.id,
                added_by=random.choice(staffIds)
            )
        foods.append(demoProduct)
    _ = [db.session.add(demoFood) for demoFood in foods]
    db.session.commit()
    return foods

def createDrinks(category, staffIds):
    drinks = []
    demoDrinkImages = {
        "Coffee": "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p.jpg",
        "Frappe": "https://moneysavingmom.com/wp-content/uploads/2023/02/frappuccino-1-630x840.jpeg",
        "MilkShake": "https://www.beeyondcereal.com/wp-content/uploads/2022/06/milkshakes-without-ice-cream6.jpg",
        "Iced Coffee": "https://frostingandfettuccine.com/wp-content/uploads/2022/12/Caramel-Iced-Coffee-6-683x1024.jpg",
        "Peach Tea": "https://images.immediate.co.uk/production/volatile/sites/2/2023/03/Peach-iced-tea-197aa60.jpg?quality=90&webp=true&resize=300,272",
        "Chai Latte": "https://www.evolvingtable.com/wp-content/uploads/2023/08/chai-tea-latte-19.jpg",
        "Matcha Latte": "https://www.justonecookbook.com/wp-content/uploads/2022/12/Matcha-Latte-4589-II.jpg"
    }
    demoDrinkNames = ["Coffee", "Frappe", "MilkShake", "Iced Coffee", "Peach Tea", "Chai Latte", "Matcha Latte"]
    for drinkName in demoDrinkNames:
        formattedDrinkName = "-".join(drinkName.split(" "))
        demoProduct = Product(
                name=drinkName,
                description=fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
                price=round(float(random.uniform(2.49, 5.49)), 2),
                units_available=random.randint(1, 1000),
                preview_image=demoDrinkImages[f'{drinkName}'],
                preview_image_name= f'drink_{formattedDrinkName}',
                category_id=category.id,
                added_by=random.choice(staffIds)
            )
        drinks.append(demoProduct)
    _ = [db.session.add(demoDrink) for demoDrink in drinks]
    db.session.commit()
    return drinks

def createInfFoods(category, staffIds):
    infFoods = []

    demoInfFoodImages = {
        "Infused BLT": {
            "imageName": "infused-sandwhich",
            "imageUrl": "https://www.southernliving.com/thmb/ZHPbfOxGS67POrrBjc6X0LYnizc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/the-sl-blt-01-4X3-b322a15a36fc436abf2796092283a40c.jpg"
        },
        "Infused PB and Banana": {
            "imageName": "infused-sandwhich",
            "imageUrl": "https://www.godairyfree.org/wp-content/uploads/2013/02/ff-spiced-pb-sandwich-2.jpg",
        },
        "Infused Egg Sandwhich": {
            "imageName": "infused-sandwhich",
            "imageUrl": "https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2021/12/egg1-1200x675.jpg"
        },
        "Infused Chicken Salad": {
            "imageName": "infused-salad",
            "imageUrl": "https://www.dinneratthezoo.com/wp-content/uploads/2020/12/grilled-chicken-salad-4.jpg"
        },
        "Infused Cookie": {
            "imageName": "infused-snacks",
            "imageUrl": "https://publish.purewow.net/wp-content/uploads/sites/2/2021/10/giant-cookie-trend-last-crumb.jpg"
        },
        "Infused Danish": {
            "imageName": "infused-snacks",
            "imageUrl": "https://www.sugarsaltmagic.com/wp-content/uploads/2021/07/How-to-make-Danish-Pastry-from-scratch-5-500x500.jpg"
        },
        "Infused Muffin": {
            "imageName": "infused-snacks",
            "imageUrl": "https://bromabakery.com/wp-content/uploads/2018/06/Anything-But-Basic-Muffin-Recipe-1067x1600.webp"
        },
        "Infused Apple Turnover": {
            "imageName": "infused-snacks",
            "imageUrl": "https://carlsbadcravings.com/wp-content/uploads/2022/10/apple-turnovers-9a.jpg"
        },
        "Infused Chocolate Crescent": {
            "imageName": "infused-snacks",
            "imageUrl": "https://sallysbakingaddiction.com/wp-content/uploads/2014/08/20-Minute-Chocolate-Croissants-5.jpg"
        },
        "Infused Stuffed Crust Pizza Bites": {
            "imageName": "infused-snacks",
            "imageUrl": "https://spicysouthernkitchen.com/wp-content/uploads/2022/03/Stuffed-Crust-Pizza-Snacks-Feature.jpg"
        }
    }
    demoInfFoodNames = ["Infused BLT", "Infused PB and Banana", "Infused Egg Sandwhich", "Infused Chicken Salad", "Infused Cookie", "Infused Danish", "Infused Muffin", "Infused Apple Turnover", "Infused Chocolate Crescent", "Infused Stuffed Crust Pizza Bites"]
    for foodName in demoInfFoodNames:
        formattedFoodName = "-".join(foodName.split(" "))
        if demoInfFoodImages[f'{foodName}']['imageName'] == 'snacks':
            demoProduct = Product(
                name="Infused " + foodName,
                description=fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
                price=round(float(random.uniform(2.49, 5.49)), 2),
                units_available=random.randint(1, 1000),
                preview_image=demoInfFoodImages[f'{foodName}']['imageUrl'],
                preview_image_name=demoInfFoodImages[f'{foodName}']['imageName'] + f'_{formattedFoodName}',
                category_id=category.id,
                added_by=random.choice(staffIds)
            )
        else:
            demoProduct = Product(
                name="Infused " + foodName,
                description=fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
                price=round(float(random.uniform(7.99, 14.99)), 2),
                units_available=random.randint(1, 1000),
                preview_image=demoInfFoodImages[f'{foodName}']['imageUrl'],
                preview_image_name="Infused_" + demoInfFoodImages[f'{foodName}']['imageName'] + f'_{formattedFoodName}',
                category_id=category.id,
                added_by=random.choice(staffIds)
            )
        infFoods.append(demoProduct)
    _ = [db.session.add(demoFood) for demoFood in infFoods]
    db.session.commit()
    return infFoods

def createInfDrinks(category, staffIds):
    infDrinks = []
    demoDrinkImages = {
        "Infused Coffee": "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p.jpg",
        "Infused Frappe": "https://moneysavingmom.com/wp-content/uploads/2023/02/frappuccino-1-630x840.jpeg",
        "Infused MilkShake": "https://www.beeyondcereal.com/wp-content/uploads/2022/06/milkshakes-without-ice-cream6.jpg",
        "Infused Iced Coffee": "https://frostingandfettuccine.com/wp-content/uploads/2022/12/Caramel-Iced-Coffee-6-683x1024.jpg",
        "Infused Peach Tea": "https://images.immediate.co.uk/production/volatile/sites/2/2023/03/Peach-iced-tea-197aa60.jpg?quality=90&webp=true&resize=300,272",
        "Infused Chai Latte": "https://www.evolvingtable.com/wp-content/uploads/2023/08/chai-tea-latte-19.jpg",
        "Infused Matcha Latte": "https://www.justonecookbook.com/wp-content/uploads/2022/12/Matcha-Latte-4589-II.jpg"
    }
    demoDrinkNames = ["Infused Coffee", "Infused Frappe", "Infused MilkShake", "Infused Iced Coffee", "Infused Peach Tea", "Infused Chai Latte", "Infused Matcha Latte"]
    for drinkName in demoDrinkNames:
        formattedDrinkName = "-".join(drinkName.split(" "))
        demoProduct = Product(
                name=drinkName,
                description=fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
                price=round(float(random.uniform(3.49, 6.49)), 2),
                units_available=random.randint(1, 1000),
                preview_image=demoDrinkImages[f'{drinkName}'],
                preview_image_name= f'drink_{formattedDrinkName}',
                category_id=category.id,
                added_by=random.choice(staffIds)
            )
        infDrinks.append(demoProduct)
    _ = [db.session.add(demoInfDrink) for demoInfDrink in infDrinks]
    db.session.commit()
    return infDrinks

def createMerch(category, staffIds):
    merchItems = []
    demoMerchImages = {"timeForMyMeds": "https://i.ebayimg.com/images/g/BpMAAOSw1WJixcyE/s-l500.jpg"}
    demoMerchNames = ["timeForMyMeds"]
    for merchName in demoMerchNames:
        formattedStrainName = "-".join(merchName.split(" "))
        demoProduct = Product(
                name=merchName,
                description=fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
                price=round(float(random.uniform(15.49, 30.49)), 2),
                units_available=random.randint(1, 1000),
                preview_image=demoMerchImages[f'{merchName}'],
                preview_image_name= f'merch_{formattedStrainName}',
                category_id=category.id,
                added_by=random.choice(staffIds)
            )
        merchItems.append(demoProduct)
    _ = [db.session.add(demoMerch) for demoMerch in merchItems]
    db.session.commit()
    return merchItems

def createPara(category, staffIds):
    paraphenliaItems = []
    demoParaImages = {"GlassBubbler": "https://www.grasscity.com/media/catalog/product/cache/991238b50a055d049ec701e2668bf240/m/i/mini-bubbler-glass-pipe-5.5_media-1-2.jpg"}
    demoParaNames = ["GlassBubbler"]
    for paraName in demoParaNames:
        formattedStrainName = "-".join(paraName.split(" "))
        demoProduct = Product(
                name=paraName,
                description=fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
                price=round(float(random.uniform(9.99, 99.99)), 2),
                units_available=random.randint(1, 1000),
                preview_image=demoParaImages[f'{paraName}'],
                preview_image_name= f'flower_{formattedStrainName}',
                category_id=category.id,
                added_by=random.choice(staffIds)
            )
        paraphenliaItems.append(demoProduct)
    _ = [db.session.add(demoPara) for demoPara in paraphenliaItems]
    db.session.commit()
    return paraphenliaItems

def createSmokeables(category, staffIds):
    smokeableItems = []
    demoGreenImages = {
        'Blue Dream':"https://budsgoods.com/wp-content/uploads/2023/02/blue-dream-cannabis-strain-min-296x300.png",
        'Girl Scout Cookies':"https://uploads.medicaljane.com/wp-content/uploads/2012/07/gscHD7.jpg",
        'Sour Diesel':"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Sour-diesel.PNG/1200px-Sour-diesel.PNG",
        'Gelato':"https://thcdesign.com/wp-content/uploads/2020/12/THC-Design-Gelato-Main-Image.jpg",
        'White Widow':"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/White_widow.jpg/800px-White_widow.jpg",
        'Durban Poison':"https://images.hytiva.com/Durban-Poison.jpg?mw667-mh1000",
        'Haze':"https://budsgoods.com/wp-content/uploads/2023/02/super-silver-haze-MA-top-strains-300x169.png",
        'Strawberry Cough':"https://ilgm.com/media/catalog/product/cache/823fa5a11dba5b7700dc56a0d67977e6/s/t/strawberry-cough-marijuana-seeds_feminized_480x480px.jpg",
        'Wedding Cake':"https://thcdesign.com/wp-content/uploads/2022/02/THC-Design-Wedding-Cake-Main-Image.jpg",
        'Alcapulco Gold':"https://upload.wikimedia.org/wikipedia/commons/8/83/Acapulco_gold.jpg"
    }
    demoGreenNames = ['Blue Dream', 'Girl Scout Cookies', 'Sour Diesel', 'Gelato', 'White Widow', 'Durban Poison', 'Haze', 'Strawberry Cough', 'Wedding Cake', 'Alcapulco Gold']
    for strainName in demoGreenNames:
        formattedStrainName = "-".join(strainName.split(" "))
        demoProduct = Product(
                name=strainName,
                description=fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
                price=round(float(random.uniform(3.49, 6.49)), 2),
                units_available=random.randint(1, 1000),
                preview_image=demoGreenImages[f'{strainName}'],
                preview_image_name= f'flower_{formattedStrainName}',
                category_id=category.id,
                added_by=random.choice(staffIds)
            )
        smokeableItems.append(demoProduct)
    _ = [db.session.add(demoStrain) for demoStrain in smokeableItems]
    db.session.commit()
    return smokeableItems

def seed_products(categories):

    [food, drink, infusedFood, infusedDrink, smokeables, merch, paraphenlia] = categories

    staffIds = [1, 2, 3]

    seededProducts = {}

    seededFoods = createFoods(food, staffIds)
    seededProducts["seededFoods"] = seededFoods

    seededDrinks = createDrinks(drink, staffIds)
    seededProducts["seededDrinks"] = seededDrinks

    seededInfFoods = createInfFoods(infusedFood, staffIds)
    seededProducts["seededInfFoods"] = seededInfFoods

    seededInfDrinks = createInfDrinks(infusedDrink, staffIds)
    seededProducts["seededInfDrinks"] = seededInfDrinks

    seededSmokeables = createSmokeables(smokeables, staffIds)
    seededProducts["seededSmokeables"] = seededSmokeables

    seededMerch = createMerch(merch, staffIds)
    seededProducts["seededMerch"] = seededMerch

    seededPara = createPara(paraphenlia, staffIds)
    seededProducts["seededPara"] = seededPara

    # print(seededProducts)
    return seededProducts


def undo_products():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM products"))
    db.session.commit()
