from ...models import db, Role, environment, SCHEMA
from sqlalchemy import text


def seed_roles():
    roleOwner = Role(name="Owner", payrate=30)
    roleManager = Role(name="Manager", payrate=25)
    roleEmployee = Role(name="Employee", payrate=20)
    roleMember = Role(name="Member")

    seedRoles = [roleMember, roleEmployee, roleManager, roleOwner]
    _ = [db.session.add(role) for role in seedRoles]
    db.session.commit()
    return seedRoles

def undo_roles():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.roles RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM roles"))
    db.session.commit()
