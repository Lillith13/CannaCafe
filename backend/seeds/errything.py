from ..models import db, User, Role, Wishlist, Favorite, Product, Category, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from datetime import datetime
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

def seed_errything():

    roleOwner = Role(name="Owner", payrate=30)
    roleManager = Role(name="Manager", payrate=25)
    roleEmployee = Role(name="Employee", payrate=20)
    roleMember = Role(name="Member", payrate=0)

    seedRoles = [roleMember, roleEmployee, roleManager, roleOwner]
    _ = [db.session.add(role) for role in seedRoles]

    db.session.commit()

    ownerDemo = User(
        firstName="Owner",
        lastName="Demo",
        birthday=datetime(1990,9,30),
        address="1479 Demo Test Run",
        city="Danksville",
        state="Cannibinoidia",
        zipcode=13420,
        username="ownerDemo",
        email="ownerDemo@test.io",
        phone = "555-555-5555",
        password="password",
        role_id=int(roleOwner.id),
        pay_rate=roleOwner.payrate
    )


    managerDemo1 = User (firstName="Manager1", lastName="Demo", birthday=datetime(1991,10,15), address="1479 Demo Test Run", city="Danksville", state="Cannibinoidia", zipcode=13420, username="managerDemo1", email="managerDemo1@test.io", phone = "555-555-5555", password="password", role_id=int(roleManager.id), pay_rate=roleManager.payrate)

    managerDemo2 = User (firstName="Manager2", lastName="Demo", birthday=datetime(1993,11,23), address="1479 Demo Test Run", city="Danksville", state="Cannibinoidia", zipcode=13420, username="managerDemo2", email="managerDemo2@test.io", phone = "555-555-5555", password="password", role_id=int(roleManager.id), pay_rate=roleManager.payrate)


    employeeDemo1 = User (firstName="Employee1", lastName="Demo", birthday=datetime(1992,1,25), address="1479 Demo Test Run", city="Danksville", state="Cannibinoidia", zipcode=13420, username="employeeDemo1", email="employeeDemo1@test.io", phone = "555-555-5555", password="password", role_id=int(roleEmployee.id), pay_rate=roleEmployee.payrate)

    employeeDemo2 = User (firstName="Employee2", lastName="Demo", birthday=datetime(1995,3,14), address="1479 Demo Test Run", city="Danksville", state="Cannibinoidia", zipcode=13420, username="employeeDemo2", email="employeeDemo2@test.io", phone = "555-555-5555", password="password", role_id=int(roleEmployee.id), pay_rate=roleEmployee.payrate)

    employeeDemo3 = User (firstName="Employee3", lastName="Demo", birthday=datetime(1989,5,5), address="1479 Demo Test Run", city="Danksville", state="Cannibinoidia", zipcode=13420, username="employeeDemo3", email="employeeDemo3@test.io", phone = "555-555-5555", password="password", role_id=int(roleEmployee.id), pay_rate=roleEmployee.payrate)

    seedUsers = [ownerDemo, managerDemo1, managerDemo2, employeeDemo1, employeeDemo2, employeeDemo3]
    _ = [db.session.add(user) for user in seedUsers]

    new_members = []
    for count in range(5):
        fakeName = fake.name()
        fakeFirstName = fakeName.split(" ")[0]
        fakeLastName = fakeName.split(" ")[1]
        
        new_member = User(
            firstName=fakeFirstName,
            lastName=fakeLastName,
            birthday=fake.date_of_birth(minimum_age=21),
            address=fake.street_address(),
            city=fake.city(),
            state=fake.state(),
            zipcode=int(fake.postcode()),
            username=f'memberDemo{count}',
            email=fake.email(),
            phone = fake.phone_number().split("x")[0],
            password="password",
            role_id=int(roleMember.id),
            pay_rate=roleMember.payrate
        )
        new_members.append(new_member)
    _ = [db.session.add(member) for member in new_members]

    db.session.commit()

    seedWishes = []
    seedFaves = []
    for user in seedUsers:
        new_wishlist = Wishlist(user_id = user.id)
        new_favorites = Favorite(user_id = user.id)
        seedWishes.append(new_wishlist)
        seedFaves.append(new_favorites)
    for user in new_members:
        new_wishlist = Wishlist(user_id = user.id)
        new_favorites = Favorite(user_id = user.id)
        seedWishes.append(new_wishlist)
        seedFaves.append(new_favorites)
    _ = [db.session.add(wish) for wish in seedWishes]
    _ = [db.session.add(fave) for fave in seedFaves]

    food = Category(name="Food", age_restricted=False)
    drink = Category(name="Drink", age_restricted=False)
    infusedFood = Category(name="Infused-Food")
    infusedDrink = Category(name="Infused-Drink")
    smokeables = Category(name="Smoke", shippable=True)
    merch = Category(name="Merch", age_restricted=False, shippable=True)
    paraphenalia = Category(name="Paraphernalia", shippable=True)

    seedCats = [food, drink, infusedFood, infusedDrink, smokeables, merch, paraphenalia]
    _ = [db.session.add(cat) for cat in seedCats]

    db.session.commit()

    staffIds = [ownerDemo.id, managerDemo1.id, managerDemo2.id]

    seededFoods = []

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
                category_id=food.id,
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
                category_id=food.id,
                added_by=random.choice(staffIds)
            )
        seededFoods.append(demoProduct)
    _ = [db.session.add(demoFood) for demoFood in seededFoods]

    db.session.commit()

    seededDrinks = []

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
                category_id=drink.id,
                added_by=random.choice(staffIds)
            )
        seededDrinks.append(demoProduct)
    _ = [db.session.add(demoDrink) for demoDrink in seededDrinks]

    db.session.commit()

    seededInfFoods = []

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
                category_id=infusedFood.id,
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
                category_id=infusedFood.id,
                added_by=random.choice(staffIds)
            )
        seededInfFoods.append(demoProduct)
    _ = [db.session.add(demoFood) for demoFood in seededInfFoods]

    db.session.commit()

    seededInfDrinks = []

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
                category_id=infusedDrink.id,
                added_by=random.choice(staffIds)
            )
        seededInfDrinks.append(demoProduct)
    _ = [db.session.add(demoInfDrink) for demoInfDrink in seededInfDrinks]
    db.session.commit()

    seededMerch = []

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
                category_id=merch.id,
                added_by=random.choice(staffIds)
            )
        seededMerch.append(demoProduct)
    _ = [db.session.add(demoMerch) for demoMerch in seededMerch]

    db.session.commit()

    seededSmokeables = []

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
                category_id=smokeables.id,
                added_by=random.choice(staffIds)
            )
        seededSmokeables.append(demoProduct)
    _ = [db.session.add(demoStrain) for demoStrain in seededSmokeables]

    db.session.commit()

    seededPara = []

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
                category_id=paraphenalia.id,
                added_by=random.choice(staffIds)
            )
        seededPara.append(demoProduct)
    _ = [db.session.add(demoPara) for demoPara in seededPara]

    db.session.commit()

    food.products.extend(seededFoods)
    drink.products.extend(seededDrinks)
    infusedFood.products.extend(seededInfFoods)
    infusedDrink.products.extend(seededInfDrinks)
    merch.products.extend(seededMerch)
    smokeables.products.extend(seededSmokeables)
    paraphenalia.products.extend(seededPara)

    db.session.commit()

def undo_errything():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.wishlists RESTART IDENTITY CASCADE")
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE")
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE")
        db.session.execute(f"TRUNCATE table {SCHEMA}.roles RESTART IDENTITY CASCADE")
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE")
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM wishlists"))
        db.session.execute(text("DELETE FROM favorites"))
        db.session.execute(text("DELETE FROM users"))
        db.session.execute(text("DELETE FROM roles"))
        db.session.execute(text("DELETE FROM products"))
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
