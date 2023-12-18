from ..models import db, Category, Product, environment, SCHEMA
from sqlalchemy.sql import text
import random

def seed_products(food, drink, infusedFood, infusedDrink, smokeables, merch, paraphenalia):
    staffIds = [1, 2, 3]

    print("food category printed from top of seed_products => ", [food])
    print("drink category printed from top of seed_products => ", [drink])
    print("drink category printed from top of seed_products => ", [infusedFood])
    print("drink category printed from top of seed_products => ", [infusedDrink])
    print("drink category printed from top of seed_products => ", [smokeables])
    print("drink category printed from top of seed_products => ", [merch])
    print("drink category printed from top of seed_products => ", [paraphenalia])

    sandwich1 = Product(
        name="BLT",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero.",
        price=round(float(random.uniform(4.99, 7.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://www.southernliving.com/thmb/ZHPbfOxGS67POrrBjc6X0LYnizc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/the-sl-blt-01-4X3-b322a15a36fc436abf2796092283a40c.jpg",
        preview_image_name="sandwich_BLT",
        category_id=food.id,
        added_by=random.choice(staffIds)
    )

    sandwich2 = Product(
        name="PB and Banana",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero.",
        price=round(float(random.uniform(4.99, 7.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://www.godairyfree.org/wp-content/uploads/2013/02/ff-spiced-pb-sandwich-2.jpg",
        preview_image_name="sandwich_PB-and-Banana",
        category_id=food.id,
        added_by=random.choice(staffIds)
    )

    sandwich3 = Product(
        name="Egg Sandwich",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero.",
        price=round(float(random.uniform(4.99, 7.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2021/12/egg1-1200x675.jpg",
        preview_image_name="sandwich_Egg-Sandwich",
        category_id=food.id,
        added_by=random.choice(staffIds)
    )

    salad = Product(
        name="Chicken Salad",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero.",
        price=round(float(random.uniform(4.99, 7.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://www.dinneratthezoo.com/wp-content/uploads/2020/12/grilled-chicken-salad-4.jpg",
        preview_image_name="salad_Chicken-Salad",
        category_id=food.id,
        added_by=random.choice(staffIds)
    )

    snack1 = Product(
        name="Cookie",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero.",
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://publish.purewow.net/wp-content/uploads/sites/2/2021/10/giant-cookie-trend-last-crumb.jpg",
        preview_image_name="snack_Cookie",
        category_id=food.id,
        added_by=random.choice(staffIds)
    )

    snack2 = Product(
        name="Danish",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero.",
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://www.sugarsaltmagic.com/wp-content/uploads/2021/07/How-to-make-Danish-Pastry-from-scratch-5-500x500.jpg",
        preview_image_name="snack_Danish",
        category_id=food.id,
        added_by=random.choice(staffIds)
    )

    snack3 = Product(
        name="Muffin",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero.",
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://bromabakery.com/wp-content/uploads/2018/06/Anything-But-Basic-Muffin-Recipe-1067x1600.webp",
        preview_image_name="snack_Muffin",
        category_id=food.id,
        added_by=random.choice(staffIds)
    )

    snack4 = Product(
        name="Apple Turnover",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero.",
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://carlsbadcravings.com/wp-content/uploads/2022/10/apple-turnovers-9a.jpg",
        preview_image_name="snack_Apple-Turnover",
        category_id=food.id,
        added_by=random.choice(staffIds)
    )

    snack5 = Product(
        name="Chocolate Crescent",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero.",
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://sallysbakingaddiction.com/wp-content/uploads/2014/08/20-Minute-Chocolate-Croissants-5.jpg",
        preview_image_name="snack_Chocolate-Crescent",
        category_id=food.id,
        added_by=random.choice(staffIds)
    )

    snack6 = Product(
        name="Stuffed Crust Pizza Bites",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero.",
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://spicysouthernkitchen.com/wp-content/uploads/2022/03/Stuffed-Crust-Pizza-Snacks-Feature.jpg",
        preview_image_name="snack_Stuffed-Crust-Pizza-Bites",
        category_id=food.id,
        added_by=random.choice(staffIds)
    )

    seededFoods = [sandwich1, sandwich2, sandwich3, salad, snack1,  snack2, snack3, snack4, snack5, snack6]
    _ = [db.session.add(demoFood) for demoFood in seededFoods]

    db.session.commit()


    drink1 = Product(
        name="Coffee",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p.jpg",
        preview_image_name="snack_Coffee",
        category_id=drink.id,
        added_by=random.choice(staffIds)
    )

    drink2 = Product(
        name="Frappe",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://moneysavingmom.com/wp-content/uploads/2023/02/frappuccino-1-630x840.jpeg",
        preview_image_name="snack_Frappe",
        category_id=drink.id,
        added_by=random.choice(staffIds)
    )

    drink3 = Product(
        name="MilkShake",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://www.beeyondcereal.com/wp-content/uploads/2022/06/milkshakes-without-ice-cream6.jpg",
        preview_image_name="snack_MilkShake",
        category_id=drink.id,
        added_by=random.choice(staffIds)
    )

    drink4 = Product(
        name="Iced Coffee",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://frostingandfettuccine.com/wp-content/uploads/2022/12/Caramel-Iced-Coffee-6-683x1024.jpg",
        preview_image_name="snack_Iced-Coffee",
        category_id=drink.id,
        added_by=random.choice(staffIds)
    )

    drink5 = Product(
        name="Matcha Latte",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://images.immediate.co.uk/production/volatile/sites/2/2023/03/Peach-iced-tea-197aa60.jpg?quality=90&webp=true&resize=300,272",
        preview_image_name="snack_Peach-Tea",
        category_id=drink.id,
        added_by=random.choice(staffIds)
    )

    drink6 = Product(
        name="Matcha Latte",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://www.justonecookbook.com/wp-content/uploads/2022/12/Matcha-Latte-4589-II.jpg",
        preview_image_name="snack_Matcha-Latte",
        category_id=drink.id,
        added_by=random.choice(staffIds)
    )

    seededDrinks = [drink1, drink2, drink3, drink4, drink5, drink6]
    _ = [db.session.add(demoDrink) for demoDrink in seededDrinks]

    db.session.commit()

    sandwich1 = Product(
        name="Infused BLT",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(4.99, 7.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://www.southernliving.com/thmb/ZHPbfOxGS67POrrBjc6X0LYnizc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/the-sl-blt-01-4X3-b322a15a36fc436abf2796092283a40c.jpg",
        preview_image_name="sandwich_Infused-BLT",
        category_id=infusedFood.id,
        added_by=random.choice(staffIds)
    )

    sandwich2 = Product(
        name="Infused PB and Banana",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(4.99, 7.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2021/12/egg1-1200x675.jpg",
        preview_image_name="sandwich_Infused-PB-and-Banana",
        category_id=infusedFood.id,
        added_by=random.choice(staffIds)
    )

    sandwich3 = Product(
        name="Infused Egg Sandwich",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(4.99, 7.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2021/12/egg1-1200x675.jpg",
        preview_image_name="sandwich_Infused-Egg-Sandwich",
        category_id=infusedFood.id,
        added_by=random.choice(staffIds)
    )

    salad = Product(
        name="Infused Chicken Salad",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(4.99, 7.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://www.dinneratthezoo.com/wp-content/uploads/2020/12/grilled-chicken-salad-4.jpg",
        preview_image_name="salad_Infused-Chicken-Salad",
        category_id=infusedFood.id,
        added_by=random.choice(staffIds)
    )

    snack1 = Product(
        name="Infused Cookie",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://publish.purewow.net/wp-content/uploads/sites/2/2021/10/giant-cookie-trend-last-crumb.jpg",
        preview_image_name="snack_Infused-Cookie",
        category_id=infusedFood.id,
        added_by=random.choice(staffIds)
    )

    snack2 = Product(
        name="Infused Danish",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://www.sugarsaltmagic.com/wp-content/uploads/2021/07/How-to-make-Danish-Pastry-from-scratch-5-500x500.jpg",
        preview_image_name="snack_Infused-Danish",
        category_id=infusedFood.id,
        added_by=random.choice(staffIds)
    )

    snack3 = Product(
        name="Infused Muffin",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://bromabakery.com/wp-content/uploads/2018/06/Anything-But-Basic-Muffin-Recipe-1067x1600.webp",
        preview_image_name="snack_Infused-Muffin",
        category_id=infusedFood.id,
        added_by=random.choice(staffIds)
    )

    snack4 = Product(
        name="Infused Apple Turnover",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://carlsbadcravings.com/wp-content/uploads/2022/10/apple-turnovers-9a.jpg",
        preview_image_name="snack_Infused-Apple-Turnover",
        category_id=infusedFood.id,
        added_by=random.choice(staffIds)
    )

    snack5 = Product(
        name="Infused Chocolate Crescent",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://sallysbakingaddiction.com/wp-content/uploads/2014/08/20-Minute-Chocolate-Croissants-5.jpg",
        preview_image_name="snack_Infused-Chocolate-Crescent",
        category_id=infusedFood.id,
        added_by=random.choice(staffIds)
    )

    snack6 = Product(
        name="Infused Stuffed Crust Pizza Bites",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://spicysouthernkitchen.com/wp-content/uploads/2022/03/Stuffed-Crust-Pizza-Snacks-Feature.jpg",
        preview_image_name="snack_Infused-Stuffed-Crust-Pizza-Bites",
        category_id=infusedFood.id,
        added_by=random.choice(staffIds)
    )

    seededInfFoods = [sandwich1, sandwich2, sandwich3, salad, snack1,   snack2, snack3, snack4, snack5, snack6]
    _ = [db.session.add(demoFood) for demoFood in seededInfFoods]

    db.session.commit()

    drink1 = Product(
        name="Coffee",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p.jpg",
        preview_image_name="snack_Coffee",
        category_id=infusedDrink.id,
        added_by=random.choice(staffIds)
    )

    drink2 = Product(
        name="Frappe",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://moneysavingmom.com/wp-content/uploads/2023/02/frappuccino-1-630x840.jpeg",
        preview_image_name="snack_Frappe",
        category_id=infusedDrink.id,
        added_by=random.choice(staffIds)
    )

    drink3 = Product(
        name="MilkShake",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://www.beeyondcereal.com/wp-content/uploads/2022/06/milkshakes-without-ice-cream6.jpg",
        preview_image_name="snack_MilkShake",
        category_id=infusedDrink.id,
        added_by=random.choice(staffIds)
    )

    drink4 = Product(
        name="Iced Coffee",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://frostingandfettuccine.com/wp-content/uploads/2022/12/Caramel-Iced-Coffee-6-683x1024.jpg",
        preview_image_name="snack_Iced-Coffee",
        category_id=infusedDrink.id,
        added_by=random.choice(staffIds)
    )

    drink5 = Product(
        name="Matcha Latte",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://images.immediate.co.uk/production/volatile/sites/2/2023/03/Peach-iced-tea-197aa60.jpg?quality=90&webp=true&resize=300,272",
        preview_image_name="snack_Peach-Tea",
        category_id=infusedDrink.id,
        added_by=random.choice(staffIds)
    )

    drink6 = Product(
        name="Matcha Latte",
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(0.99, 2.99)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://www.justonecookbook.com/wp-content/uploads/2022/12/Matcha-Latte-4589-II.jpg",
        preview_image_name="snack_Matcha-Latte",
        category_id=infusedDrink.id,
        added_by=random.choice(staffIds)
    )

    seededInfDrinks = [drink1, drink2, drink3, drink4, drink5, drink6]
    _ = [db.session.add(demoInfDrink) for demoInfDrink in seededInfDrinks]
    db.session.commit()


    seededMerch = Product(
            name="timeForMyMeds",
            description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
            price=round(float(random.uniform(15.49, 30.49)), 2),
            units_available=random.randint(1, 1000),
            preview_image="https://i.ebayimg.com/images/g/BpMAAOSw1WJixcyE/s-l500.jpg",
            preview_image_name= 'merch_timeForMyMeds',
            category_id=merch.id,
            added_by=random.choice(staffIds)
        )
    db.session.add(seededMerch)
    db.session.commit()

    smoke1 = Product(
        name='Blue Dream',
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(3.49, 6.49)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://budsgoods.com/wp-content/uploads/2023/02/blue-dream-cannabis-strain-min-296x300.png",
        preview_image_name= f'flower_Blue Dream',
        category_id=smokeables.id,
        added_by=random.choice(staffIds)
    )

    smoke2 = Product(
        name='Girl Scout Cookies',
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(3.49, 6.49)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://uploads.medicaljane.com/wp-content/uploads/2012/07/gscHD7.jpg",
        preview_image_name= f'flower_Girl Scout Cookies',
        category_id=smokeables.id,
        added_by=random.choice(staffIds)
    )

    smoke3 = Product(
        name='Sour Diesel',
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(3.49, 6.49)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Sour-diesel.PNG/1200px-Sour-diesel.PNG",
        preview_image_name= f'flower_Sour Diesel',
        category_id=smokeables.id,
        added_by=random.choice(staffIds)
    )

    smoke4 = Product(
        name='Gelato',
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(3.49, 6.49)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://thcdesign.com/wp-content/uploads/2020/12/THC-Design-Gelato-Main-Image.jpg",
        preview_image_name= f'flower_Gelato',
        category_id=smokeables.id,
        added_by=random.choice(staffIds)
    )

    smoke5 = Product(
        name='White Widow',
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(3.49, 6.49)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/White_widow.jpg/800px-White_widow.jpg",
        preview_image_name= f'flower_White Widow',
        category_id=smokeables.id,
        added_by=random.choice(staffIds)
    )

    smoke6 = Product(
        name='Durban Poison',
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(3.49, 6.49)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://images.hytiva.com/Durban-Poison.jpg?mw667-mh1000",
        preview_image_name= f'flower_Durban Poison',
        category_id=smokeables.id,
        added_by=random.choice(staffIds)
    )

    smoke7 = Product(
        name='Haze',
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(3.49, 6.49)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://budsgoods.com/wp-content/uploads/2023/02/super-silver-haze-MA-top-strains-300x169.png",
        preview_image_name= f'flower_Haze',
        category_id=smokeables.id,
        added_by=random.choice(staffIds)
    )

    smoke8 = Product(
        name='Strawberry Cough',
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(3.49, 6.49)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://ilgm.com/media/catalog/product/cache/823fa5a11dba5b7700dc56a0d67977e6/s/t/strawberry-cough-marijuana-seeds_feminized_480x480px.jpg",
        preview_image_name= f'flower_Strawberry-Cough',
        category_id=smokeables.id,
        added_by=random.choice(staffIds)
    )

    smoke9 = Product(
        name='Wedding Cake',
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(3.49, 6.49)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://thcdesign.com/wp-content/uploads/2022/02/THC-Design-Wedding-Cake-Main-Image.jpg",
        preview_image_name= f'flower_Wedding-Cake',
        category_id=smokeables.id,
        added_by=random.choice(staffIds)
    )

    smoke10 = Product(
        name='Alcapulco Gold',
        description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
        price=round(float(random.uniform(3.49, 6.49)), 2),
        units_available=random.randint(1, 1000),
        preview_image="https://upload.wikimedia.org/wikipedia/commons/8/83/Acapulco_gold.jpg",
        preview_image_name= f'flower_Alcapulco-Gold',
        category_id=smokeables.id,
        added_by=random.choice(staffIds)
    )

    seededSmokeables = [smoke1, smoke2, smoke3, smoke4, smoke5, smoke6,     smoke7, smoke8, smoke9, smoke10]
    _ = [db.session.add(demoStrain) for demoStrain in seededSmokeables]

    db.session.commit()

    demoParaNames = ["GlassBubbler"]
    seededPara = Product(
            name="GlassBubbler",
            description= "In vitae tortor id eros tempus tincidunt at sed nisl. Nunc vehicula, metus non egestas sodales, lacus enim venenatis mauris, et ultrices ante ante eget nisl. Sed posuere efficitur sodales. Sed maximus felis at nisi varius eleifend. Cras varius nec urna nec rutrum. Donec at lectus quis neque maximus tempor nec sit amet leo. Donec maximus, arcu ac porta ullamcorper, ante eros ultricies tellus, nec egestas est lorem id libero. Nulla semper fringilla eros ultricies sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum quam, bibendum et lectus id, condimentum finibus quam. Curabitur pharetra ultrices magna sit amet scelerisque. Suspendisse ligula sapien, pretium eu rutrum nec, rutrum et quam.",
            price=round(float(random.uniform(9.99, 99.99)), 2),
            units_available=random.randint(1, 1000),
            preview_image="https://www.grasscity.com/media/catalog/product/cache/991238b50a055d049ec701e2668bf240/m/i/mini-bubbler-glass-pipe-5.5_media-1-2.jpg",
            preview_image_name= f'para-item_GlassBubbler',
            category_id=paraphenalia.id,
            added_by=random.choice(staffIds)
        )
    db.session.add(seededPara)
    db.session.commit()

    print("print before linking products with their respective categories")
    print("", food.products)
    food.products.extend(seededFoods)

    print("", drink.products)
    drink.products.extend(seededDrinks)

    print("", infusedFood.products)
    infusedFood.products.extend(seededInfFoods)

    print("", infusedDrink.products)
    infusedDrink.products.extend(seededInfDrinks)

    print("", merch.products)
    merch.products.extend([seededMerch])

    print("", smokeables.products)
    smokeables.products.extend(seededSmokeables)

    print("", paraphenalia.products)
    paraphenalia.products.extend([seededPara])
    print("print after linking products with their respective categories")

    db.session.commit()

def undo_products():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.category_products RESTART IDENTITY CASCADE")
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE")
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM category_products"))
        db.session.execute(text("DELETE FROM products"))
        db.session.execute(text("DELETE FROM categories"))
        db.session.commit()
