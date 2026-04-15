from math import prod

from backend.models.joins import FavoriteDetail, OrderProduct, WishlistDetail

from ..models import db, environment, SCHEMA, User, Product, Order, Review, Favorite, Wishlist
from sqlalchemy.sql import text

from faker import Faker
import random
from datetime import timedelta

fake = Faker('la')

# Seed all User Interactions (Orders, Reviews, Favorites, Wishlists)
def seed_fake_user_interactions():
    userIDs = [user.id for user in User.query.all()] # all users from seeded users
    productIDs = [product.id for product in Product.query.all()] # all products from seeded products
    faveListIDs = [fave.id for fave in Favorite.query.all()] # all favorites from seeded favorites
    wishListIDs = [wish.id for wish in Wishlist.query.all()] # all wishlists from seeded wishlists

    seed_orders(userIDs, productIDs);
    seed_reviews(userIDs, productIDs);
    seed_favorites(userIDs, productIDs, faveListIDs);
    seed_wishlists(userIDs, productIDs, wishListIDs);

def undo_fake_user_interactions():
    undo_orders();
    undo_reviews();
    undo_favorites();
    undo_wishlists();


# Seed Orders
def seed_orders(userIDs, productIDs):
    order = None

    loopLength = 100 # arbitrary number of orders to seed
    for _ in range(loopLength):

        order = Order()
        db.session.add(order)
        db.session.commit()

        order.user_id.update(random.choice(userIDs)) # assign random user to order from seeded users

        #calc total for seeded order + add products to order "sub table" (order_products)
        products = random.sample(productIDs, k=random.randint(1, 5)) # each order will have between 1 and 5 products
        total = 0 # will be updated when products are added to order
        for product_id in products:
            newOrderItem = OrderProduct(
                order_id = order.id,
                product_id = product_id,
                quantity = random.randint(1, 5)
            )
            db.session.add(newOrderItem)
            total += Product.query.get(product_id).price # calculate total by summing price of each product in order

        order.total.update(total) # update total for order
        order.placed.update(fake.date_time_between(start_date='-1y', end_date='now'))
        order.shipped.update(fake.date_time_between(start_date=order.placed, end_date=order.placed + timedelta(weeks=2)))
        order.fulfilled.update(fake.date_time_between(start_date=order.shipped, end_date=order.shipped + timedelta(weeks=2)))

        # db.session.add(order)
        # db.session.commit();

def undo_orders():
    if environment == "production":
        db.session.execute(text(f"TRUNCATE table {SCHEMA}.order_products RESTART IDENTITY CASCADE;"))
        db.session.execute(text(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;"))
    else:
        db.session.execute(text("DELETE FROM order_products"))
        db.session.execute(text("DELETE FROM orders"))
        db.session.commit()


# Seed Reviews
def seed_reviews(userIDs, productIDs):
    loopLength = 100 # arbitrary number of reviews to seed
    for _ in range(loopLength):

        user_id = random.choice(userIDs) # assign random user to review from seeded users
        product_id = random.choice(productIDs) # assign random product to review from seeded products

        review = Review(
            user_id=user_id,
            product_id=product_id,
            review=fake.paragraph(nb_sentences=5), # generate fake review text
            rating=random.randint(1, 5) # assign random rating between 1 and 5
        )

        db.session.add(review)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(text(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;"))
    else:
        db.session.execute(text("DELETE FROM reviews"))
        db.session.commit()


# Seed Favorites
def seed_favorites(userIds, productIDs, faveListIDs):
    for fid in faveListIDs: # each favorite list will have 1 user
        for prod in random.sample(Product.query.all(), k=random.randint(1, 25)): # each favorite list will have between 1 and 25 products
            newFaveItem = FavoriteDetail(
                favorite_id = fid, #when seeded uid and fave.id should be the same
                product_id = prod.id,
            )
            db.session.add(newFaveItem)
            db.session.commit()


def undo_favorites():
    if environment == "production":
        db.session.execute(text(f"TRUNCATE table {SCHEMA}.favorite_details RESTART IDENTITY CASCADE;"))
        db.session.execute(text(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;"))
    else:
        db.session.execute(text("DELETE FROM favorite_details"))
        db.session.execute(text("DELETE FROM favorites"))
        db.session.commit()


# Seed Wishlists
def seed_wishlists(userIds, productIDs, wishListIDs):
    for wid in wishListIDs: # each wishlist will have 1 user
        for prod in random.sample(Product.query.all(), k=random.randint(1, 50)): # each wishlist will have between 1 and 50 products
            newWishItem = WishlistDetail(
                wishlist_id = wid, #when seeded uid and wishlist.id should be the same
                product_id = prod.id,
            )
            db.session.add(newWishItem)
            db.session.commit()

def undo_wishlists():
    if environment == "production":
        db.session.execute(text(f"TRUNCATE table {SCHEMA}.wishlist_details RESTART IDENTITY CASCADE;"))
        db.session.execute(text(f"TRUNCATE table {SCHEMA}.wishlists RESTART IDENTITY CASCADE;"))
    else:
        db.session.execute(text("DELETE FROM wishlist_details"))
        db.session.execute(text("DELETE FROM wishlists"))
        db.session.commit()
