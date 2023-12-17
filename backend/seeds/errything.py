from ..models import db, User, Role, Wishlist, Favorite, Product, Category, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from datetime import datetime
import random

fake = Faker()

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

    # new_members = []
    # for count in range(5):
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
        zipcode=fake.postcode(),
        username=f'memberDemo',
        email=fake.email(),
        phone = '555-555-5555',
        password="password",
        role_id=int(roleMember.id),
        pay_rate=roleMember.payrate
    )
        # new_members.append(new_member)
    # _ = [db.session.add(member) for member in new_members]
    db.session.add(new_member)
    db.session.commit()

    seedWishes = []
    seedFaves = []
    for user in seedUsers:
        new_wishlist = Wishlist(user_id = user.id)
        new_favorites = Favorite(user_id = user.id)
        seedWishes.append(new_wishlist)
        seedFaves.append(new_favorites)
    # for user in new_members:
    new_wishlist = Wishlist(user_id = new_member.id)
    new_favorites = Favorite(user_id = new_member.id)
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

    sandwich1 = Product(
        name="BLT",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(4.99, 7.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://www.southernliving.com/thmb/ZHPbfOxGS67POrrBjc6X0LYnizc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/the-sl-blt-01-4X3-b322a15a36fc436abf2796092283a40c.jpg",
        preview_image_name="sandwich_BLT",
        category_id=food.id,
        added_by=random.choice(staffIds)
    )
    seededFoods.append(sandwich1)
    sandwich2 = Product(
        name="PB and Banana",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(4.99, 7.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://www.godairyfree.org/wp-content/uploads/2013/02/ff-spiced-pb-sandwich-2.jpg",
        preview_image_name="sandwich_PB-and-Banana",
        category_id=food.id,
        added_by=random.choice(staffIds)
    )
    seededFoods.append(sandwich2)
    sandwich3 = Product(
        name="Egg Sandwich",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(4.99, 7.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2021/12/egg1-1200x675.jpg",
        preview_image_name="sandwich_Egg-Sandwich",
        category_id=food.id,
        added_by=random.choice(staffIds)
    )
    seededFoods.append(sandwich3)
    salad = Product(
        name="Chicken Salad",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(4.99, 7.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://www.dinneratthezoo.com/wp-content/uploads/2020/12/grilled-chicken-salad-4.jpg",
        preview_image_name="salad_Chicken-Salad",
        category_id=food.id,
        added_by=random.choice(staffIds)
    )
    seededFoods.append(salad)
    snack1 = Product(
        name="Cookie",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://publish.purewow.net/wp-content/uploads/sites/2/2021/10/giant-cookie-trend-last-crumb.jpg",
        preview_image_name="snack_Cookie",
        category_id=food.id,
        added_by=random.choice(staffIds)
    )
    seededFoods.append(snack1)
    snack2 = Product(
        name="Danish",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://www.sugarsaltmagic.com/wp-content/uploads/2021/07/How-to-make-Danish-Pastry-from-scratch-5-500x500.jpg",
        preview_image_name="snack_Danish",
        category_id=food.id,
        added_by=random.choice(staffIds)
    )
    seededFoods.append(snack2)
    snack3 = Product(
        name="Muffin",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://bromabakery.com/wp-content/uploads/2018/06/Anything-But-Basic-Muffin-Recipe-1067x1600.webp",
        preview_image_name="snack_Muffin",
        category_id=food.id,
        added_by=random.choice(staffIds)
    )
    seededFoods.append(snack3)
    snack4 = Product(
        name="Apple Turnover",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://carlsbadcravings.com/wp-content/uploads/2022/10/apple-turnovers-9a.jpg",
        preview_image_name="snack_Apple-Turnover",
        category_id=food.id,
        added_by=random.choice(staffIds)
    )
    seededFoods.append(snack4)
    snack5 = Product(
        name="Chocolate Crescent",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://sallysbakingaddiction.com/wp-content/uploads/2014/08/20-Minute-Chocolate-Croissants-5.jpg",
        preview_image_name="snack_Chocolate-Crescent",
        category_id=food.id,
        added_by=random.choice(staffIds)
    )
    seededFoods.append(snack5)
    snack6 = Product(
        name="Stuffed Crust Pizza Bites",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://spicysouthernkitchen.com/wp-content/uploads/2022/03/Stuffed-Crust-Pizza-Snacks-Feature.jpg",
        preview_image_name="snack_Stuffed-Crust-Pizza-Bites",
        category_id=food.id,
        added_by=random.choice(staffIds)
    )
    seededFoods.append(snack6)

    _ = [db.session.add(demoFood) for demoFood in seededFoods]

    db.session.commit()

    seededDrinks = []

    drink1 = Product(
        name="Coffee",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p.jpg",
        preview_image_name="snack_Coffee",
        category_id=drink.id,
        added_by=random.choice(staffIds)
    )
    seededDrinks.append(drink1)
    drink2 = Product(
        name="Frappe",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://moneysavingmom.com/wp-content/uploads/2023/02/frappuccino-1-630x840.jpeg",
        preview_image_name="snack_Frappe",
        category_id=drink.id,
        added_by=random.choice(staffIds)
    )
    seededDrinks.append(drink2)
    drink3 = Product(
        name="MilkShake",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://www.beeyondcereal.com/wp-content/uploads/2022/06/milkshakes-without-ice-cream6.jpg",
        preview_image_name="snack_MilkShake",
        category_id=drink.id,
        added_by=random.choice(staffIds)
    )
    seededDrinks.append(drink3)
    drink4 = Product(
        name="Iced Coffee",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://frostingandfettuccine.com/wp-content/uploads/2022/12/Caramel-Iced-Coffee-6-683x1024.jpg",
        preview_image_name="snack_Iced-Coffee",
        category_id=drink.id,
        added_by=random.choice(staffIds)
    )
    seededDrinks.append(drink4)
    drink5 = Product(
        name="Matcha Latte",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://images.immediate.co.uk/production/volatile/sites/2/2023/03/Peach-iced-tea-197aa60.jpg?quality=90&webp=true&resize=300,272",
        preview_image_name="snack_Peach-Tea",
        category_id=drink.id,
        added_by=random.choice(staffIds)
    )
    seededDrinks.append(drink5)
    drink6 = Product(
        name="Matcha Latte",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://www.justonecookbook.com/wp-content/uploads/2022/12/Matcha-Latte-4589-II.jpg",
        preview_image_name="snack_Matcha-Latte",
        category_id=drink.id,
        added_by=random.choice(staffIds)
    )
    seededDrinks.append(drink6)

    _ = [db.session.add(demoDrink) for demoDrink in seededDrinks]

    db.session.commit()

    seededInfFoods = []

    sandwich1 = Product(
        name="Infused BLT",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(4.99, 7.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://www.southernliving.com/thmb/ZHPbfOxGS67POrrBjc6X0LYnizc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/the-sl-blt-01-4X3-b322a15a36fc436abf2796092283a40c.jpg",
        preview_image_name="sandwich_Infused-BLT",
        category_id=infusedFood.id,
        added_by=random.choice(staffIds)
    )
    seededInfFoods.append(sandwich1)
    sandwich2 = Product(
        name="Infused PB and Banana",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(4.99, 7.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2021/12/egg1-1200x675.jpg",
        preview_image_name="sandwich_Infused-PB-and-Banana",
        category_id=infusedFood.id,
        added_by=random.choice(staffIds)
    )
    seededInfFoods.append(sandwich2)
    sandwich3 = Product(
        name="Infused Egg Sandwich",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(4.99, 7.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2021/12/egg1-1200x675.jpg",
        preview_image_name="sandwich_Infused-Egg-Sandwich",
        category_id=infusedFood.id,
        added_by=random.choice(staffIds)
    )
    seededInfFoods.append(sandwich3)
    salad = Product(
        name="Infused Chicken Salad",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(4.99, 7.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://www.dinneratthezoo.com/wp-content/uploads/2020/12/grilled-chicken-salad-4.jpg",
        preview_image_name="salad_Infused-Chicken-Salad",
        category_id=infusedFood.id,
        added_by=random.choice(staffIds)
    )
    seededInfFoods.append(salad)
    snack1 = Product(
        name="Infused Cookie",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://publish.purewow.net/wp-content/uploads/sites/2/2021/10/giant-cookie-trend-last-crumb.jpg",
        preview_image_name="snack_Infused-Cookie",
        category_id=infusedFood.id,
        added_by=random.choice(staffIds)
    )
    seededInfFoods.append(snack1)
    snack2 = Product(
        name="Infused Danish",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://www.sugarsaltmagic.com/wp-content/uploads/2021/07/How-to-make-Danish-Pastry-from-scratch-5-500x500.jpg",
        preview_image_name="snack_Infused-Danish",
        category_id=infusedFood.id,
        added_by=random.choice(staffIds)
    )
    seededInfFoods.append(snack2)
    snack3 = Product(
        name="Infused Muffin",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://bromabakery.com/wp-content/uploads/2018/06/Anything-But-Basic-Muffin-Recipe-1067x1600.webp",
        preview_image_name="snack_Infused-Muffin",
        category_id=infusedFood.id,
        added_by=random.choice(staffIds)
    )
    seededInfFoods.append(snack3)
    snack4 = Product(
        name="Infused Apple Turnover",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://carlsbadcravings.com/wp-content/uploads/2022/10/apple-turnovers-9a.jpg",
        preview_image_name="snack_Infused-Apple-Turnover",
        category_id=infusedFood.id,
        added_by=random.choice(staffIds)
    )
    seededInfFoods.append(snack4)
    snack5 = Product(
        name="Infused Chocolate Crescent",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://sallysbakingaddiction.com/wp-content/uploads/2014/08/20-Minute-Chocolate-Croissants-5.jpg",
        preview_image_name="snack_Infused-Chocolate-Crescent",
        category_id=infusedFood.id,
        added_by=random.choice(staffIds)
    )
    seededInfFoods.append(snack5)
    snack6 = Product(
        name="Infused Stuffed Crust Pizza Bites",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://spicysouthernkitchen.com/wp-content/uploads/2022/03/Stuffed-Crust-Pizza-Snacks-Feature.jpg",
        preview_image_name="snack_Infused-Stuffed-Crust-Pizza-Bites",
        category_id=infusedFood.id,
        added_by=random.choice(staffIds)
    )
    seededInfFoods.append(snack6)

    _ = [db.session.add(demoFood) for demoFood in seededInfFoods]

    db.session.commit()

    seededInfDrinks = []

    drink1 = Product(
        name="Coffee",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p.jpg",
        preview_image_name="snack_Coffee",
        category_id=infusedDrink.id,
        added_by=random.choice(staffIds)
    )
    seededInfDrinks.append(drink1)
    drink2 = Product(
        name="Frappe",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://moneysavingmom.com/wp-content/uploads/2023/02/frappuccino-1-630x840.jpeg",
        preview_image_name="snack_Frappe",
        category_id=infusedDrink.id,
        added_by=random.choice(staffIds)
    )
    seededInfDrinks.append(drink2)
    drink3 = Product(
        name="MilkShake",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://www.beeyondcereal.com/wp-content/uploads/2022/06/milkshakes-without-ice-cream6.jpg",
        preview_image_name="snack_MilkShake",
        category_id=infusedDrink.id,
        added_by=random.choice(staffIds)
    )
    seededInfDrinks.append(drink3)
    drink4 = Product(
        name="Iced Coffee",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://frostingandfettuccine.com/wp-content/uploads/2022/12/Caramel-Iced-Coffee-6-683x1024.jpg",
        preview_image_name="snack_Iced-Coffee",
        category_id=infusedDrink.id,
        added_by=random.choice(staffIds)
    )
    seededInfDrinks.append(drink4)
    drink5 = Product(
        name="Matcha Latte",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://images.immediate.co.uk/production/volatile/sites/2/2023/03/Peach-iced-tea-197aa60.jpg?quality=90&webp=true&resize=300,272",
        preview_image_name="snack_Peach-Tea",
        category_id=infusedDrink.id,
        added_by=random.choice(staffIds)
    )
    seededInfDrinks.append(drink5)
    drink6 = Product(
        name="Matcha Latte",
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://www.justonecookbook.com/wp-content/uploads/2022/12/Matcha-Latte-4589-II.jpg",
        preview_image_name="snack_Matcha-Latte",
        category_id=infusedDrink.id,
        added_by=random.choice(staffIds)
    )
    seededInfDrinks.append(drink6)
    _ = [db.session.add(demoInfDrink) for demoInfDrink in seededInfDrinks]
    db.session.commit()

    # seededMerch = []

    seededMerch = Product(
            name="timeForMyMeds",
            description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
            price=round(float(random.uniform(15.49, 30.49)), 2),
            units_available=random.randint(1, 1000),
            preview_image="https://i.ebayimg.com/images/g/BpMAAOSw1WJixcyE/s-l500.jpg",
            preview_image_name= 'merch_timeForMyMeds',
            category_id=merch.id,
            added_by=random.choice(staffIds)
        )
    db.session.add(seededMerch)
    # seededMerch.append(demoProduct)
    # _ = [db.session.add(demoMerch) for demoMerch in seededMerch]

    db.session.commit()

    seededSmokeables = []

    smoke1 = Product(
        name='Blue Dream',
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(3.49, 6.49)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://budsgoods.com/wp-content/uploads/2023/02/blue-dream-cannabis-strain-min-296x300.png",
        preview_image_name= f'flower_Blue Dream',
        category_id=smokeables.id,
        added_by=random.choice(staffIds)
    )
    seededSmokeables.append(smoke1)

    smoke2 = Product(
        name='Girl Scout Cookies',
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(3.49, 6.49)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://uploads.medicaljane.com/wp-content/uploads/2012/07/gscHD7.jpg",
        preview_image_name= f'flower_Girl Scout Cookies',
        category_id=smokeables.id,
        added_by=random.choice(staffIds)
    )
    seededSmokeables.append(smoke2)

    smoke3 = Product(
        name='Sour Diesel',
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(3.49, 6.49)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Sour-diesel.PNG/1200px-Sour-diesel.PNG",
        preview_image_name= f'flower_Sour Diesel',
        category_id=smokeables.id,
        added_by=random.choice(staffIds)
    )
    seededSmokeables.append(smoke3)

    smoke4 = Product(
        name='Gelato',
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(3.49, 6.49)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://thcdesign.com/wp-content/uploads/2020/12/THC-Design-Gelato-Main-Image.jpg",
        preview_image_name= f'flower_Gelato',
        category_id=smokeables.id,
        added_by=random.choice(staffIds)
    )
    seededSmokeables.append(smoke4)

    smoke5 = Product(
        name='White Widow',
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(3.49, 6.49)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/White_widow.jpg/800px-White_widow.jpg",
        preview_image_name= f'flower_White Widow',
        category_id=smokeables.id,
        added_by=random.choice(staffIds)
    )
    seededSmokeables.append(smoke5)

    smoke6 = Product(
        name='Durban Poison',
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(3.49, 6.49)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://images.hytiva.com/Durban-Poison.jpg?mw667-mh1000",
        preview_image_name= f'flower_Durban Poison',
        category_id=smokeables.id,
        added_by=random.choice(staffIds)
    )
    seededSmokeables.append(smoke6)

    smoke7 = Product(
        name='Haze',
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(3.49, 6.49)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://budsgoods.com/wp-content/uploads/2023/02/super-silver-haze-MA-top-strains-300x169.png",
        preview_image_name= f'flower_Haze',
        category_id=smokeables.id,
        added_by=random.choice(staffIds)
    )
    seededSmokeables.append(smoke7)

    smoke8 = Product(
        name='Strawberry Cough',
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(3.49, 6.49)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://ilgm.com/media/catalog/product/cache/823fa5a11dba5b7700dc56a0d67977e6/s/t/strawberry-cough-marijuana-seeds_feminized_480x480px.jpg",
        preview_image_name= f'flower_Strawberry Cough',
        category_id=smokeables.id,
        added_by=random.choice(staffIds)
    )
    seededSmokeables.append(smoke8)

    smoke9 = Product(
        name='Wedding Cake',
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(3.49, 6.49)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://thcdesign.com/wp-content/uploads/2022/02/THC-Design-Wedding-Cake-Main-Image.jpg",
        preview_image_name= f'flower_Wedding Cake',
        category_id=smokeables.id,
        added_by=random.choice(staffIds)
    )
    seededSmokeables.append(smoke9)

    smoke10 = Product(
        name='Alcapulco Gold',
        description= fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
        price=round(float(random.uniform(3.49, 6.49)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://upload.wikimedia.org/wikipedia/commons/8/83/Acapulco_gold.jpg",
        preview_image_name= f'flower_Alcapulco Gold',
        category_id=smokeables.id,
        added_by=random.choice(staffIds)
    )
    seededSmokeables.append(smoke10)

    _ = [db.session.add(demoStrain) for demoStrain in seededSmokeables]

    db.session.commit()

    seededPara = []

    demoParaImages = {"GlassBubbler": "https://www.grasscity.com/media/catalog/product/cache/991238b50a055d049ec701e2668bf240/m/i/mini-bubbler-glass-pipe-5.5_media-1-2.jpg"}
    demoParaNames = ["GlassBubbler"]
    for paraName in demoParaNames:
        formattedStrainName = "-".join(paraName.split(" "))
        demoProduct = Product(
                name=paraName,
                description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
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

    print(seededFoods)
    food.products.extend(seededFoods)
    drink.products.extend(seededDrinks)
    infusedFood.products.extend(seededInfFoods)
    infusedDrink.products.extend(seededInfDrinks)
    merch.products.extend([seededMerch])
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
