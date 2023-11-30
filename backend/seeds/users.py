from ..models import db, User, Role, Wishlist, Favorite, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_users():
    roleOwner = Role(name="Owner", payrate=30)
    roleManager = Role(name="Manager", payrate=25)
    roleEmployee = Role(name="Employee", payrate=20)
    roleMember = Role(name="Member")

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
        password="password",
        role_id=int(roleOwner.id),
        pay_rate=roleOwner.payrate
    )


    managerDemo1 = User (firstName="Manager1", lastName="Demo", birthday=datetime(1991,10,15), address="1479 Demo Test Run", city="Danksville", state="Cannibinoidia", zipcode=13420, username="managerDemo1", email="managerDemo1@test.io", password="password", role_id=int(roleManager.id), pay_rate=roleManager.payrate)

    managerDemo2 = User (firstName="Manager2", lastName="Demo", birthday=datetime(1993,11,23), address="1479 Demo Test Run", city="Danksville", state="Cannibinoidia", zipcode=13420, username="managerDemo2", email="managerDemo2@test.io", password="password", role_id=int(roleManager.id), pay_rate=roleManager.payrate)


    employeeDemo1 = User (firstName="Employee1", lastName="Demo", birthday=datetime(1992,1,25), address="1479 Demo Test Run", city="Danksville", state="Cannibinoidia", zipcode=13420, username="employeeDemo1", email="employeeDemo1@test.io", password="password", role_id=int(roleEmployee.id), pay_rate=roleEmployee.payrate)

    employeeDemo2 = User (firstName="Employee2", lastName="Demo", birthday=datetime(1995,3,14), address="1479 Demo Test Run", city="Danksville", state="Cannibinoidia", zipcode=13420, username="employeeDemo2", email="employeeDemo2@test.io", password="password", role_id=int(roleEmployee.id), pay_rate=roleEmployee.payrate)

    employeeDemo3 = User (firstName="Employee3", lastName="Demo", birthday=datetime(1989,5,5), address="1479 Demo Test Run", city="Danksville", state="Cannibinoidia", zipcode=13420, username="employeeDemo3", email="employeeDemo3@test.io", password="password", role_id=int(roleEmployee.id), pay_rate=roleEmployee.payrate)


    memberDemo1 = User (firstName="Member1", lastName="Demo", birthday=datetime(1985,6,15), address="1479 Demo Test Run", city="Danksville", state="Cannibinoidia", zipcode=13420, username="memberDemo1", email="memberDemo1@test.io", password="password", role_id=int(roleMember.id))

    memberDemo2 = User (firstName="Member2", lastName="Demo", birthday=datetime(1980,4,16), address="1479 Demo Test Run", city="Danksville", state="Cannibinoidia", zipcode=13420, username="memberDemo2", email="memberDemo2@test.io", password="password", role_id=int(roleMember.id))

    memberDemo3 = User (firstName="Member3", lastName="Demo", birthday=datetime(1991,12,15), address="1479 Demo Test Run", city="Danksville", state="Cannibinoidia", zipcode=13420, username="memberDemo3", email="memberDemo3@test.io", password="password", role_id=int(roleMember.id))

    memberDemo4 = User (firstName="Member4", lastName="Demo", birthday=datetime(1994,8,29), address="1479 Demo Test Run", city="Danksville", state="Cannibinoidia", zipcode=13420, username="memberDemo4", email="memberDemo4@test.io", password="password", role_id=int(roleMember.id))

    memberDemo5 = User (firstName="Member5", lastName="Demo", birthday=datetime(1975,6,8), address="1479 Demo Test Run", city="Danksville", state="Cannibinoidia", zipcode=13420, username="memberDemo5", email="memberDemo5@test.io", password="password", role_id=int(roleMember.id))

    seedUsers = [ownerDemo, managerDemo1, managerDemo2, employeeDemo1, employeeDemo2, employeeDemo3, memberDemo1, memberDemo2, memberDemo3, memberDemo4, memberDemo5]
    _ = [db.session.add(user) for user in seedUsers]
    db.session.commit()

    seedWishes = []
    seedFaves = []
    for user in seedUsers:
        new_wishlist = Wishlist(user_id = user.id)
        new_favorites = Favorite(user_id = user.id)
        seedWishes.append(new_wishlist)
        seedFaves.append(new_favorites)
    _ = [db.session.add(wish) for wish in seedWishes]
    _ = [db.session.add(fave) for fave in seedFaves]
    db.session.commit()

def undo_users():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM users"))
    db.session.commit()
