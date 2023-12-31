from ..models import db, User, Wishlist, Favorite, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_users(roleOwner, roleManager, roleEmployee, roleMember):

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

    new_member = User(
        firstName="Member",
        lastName="Demo",
        birthday=datetime(1989,5,5),
        address="1479 Demo Test Run",
        city="Danksville",
        state="Cannibinoidia",
        zipcode="13420",
        username="memberDemo",
        email="memberDemo@test.io",
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

def undo_users():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE")
        db.session.execute(f"TRUNCATE table {SCHEMA}.wishlists RESTART IDENTITY CASCADE")
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE")
        db.session.execute(f"TRUNCATE table {SCHEMA}.roles RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM favorites"))
        db.session.execute(text("DELETE FROM wishlists"))
        db.session.execute(text("DELETE FROM users"))
        db.session.execute(text("DELETE FROM roles"))
        db.session.commit()
