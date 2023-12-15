from ...models import  db, User, Wishlist, Favorite, environment, SCHEMA
from sqlalchemy import text
from faker import Faker

fake = Faker()

# from .staff import seededMemberRole

def seed_members(seededMemberRole):
    new_users = []
    for count in range(25):
        fakeName = fake.name()
        fakeFirstName = fakeName.split(" ")[0]
        fakeLastName = fakeName.split(" ")[1]
        new_user = User(
            firstName=fakeFirstName,
            lastName=fakeLastName,
            birthday=fake.date_of_birth(minimum_age=21),
            address=fake.street_address(),
            city=fake.city(),
            state=fake.state(),
            zipcode=int(fake.postcode()),
            username=f'memberDemo_{count}',
            email=fake.email(),
            phone = fake.phone_number().split("x")[0],
            password="password",
            role_id=int(seededMemberRole.id),
            pay_rate=seededMemberRole.payrate
        )
        new_users.append(new_user)
    _ = [db.session.add(member) for member in new_users]
    db.session.commit()
    return new_users
