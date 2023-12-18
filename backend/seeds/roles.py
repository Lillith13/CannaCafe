from ..models import db, Role, environment, SCHEMA
from sqlalchemy.sql import text

from .users import seed_users

def seed_roles():
    roleOwner = Role(name="Owner", payrate=30)
    roleManager = Role(name="Manager", payrate=25)
    roleEmployee = Role(name="Employee", payrate=20)
    roleMember = Role(name="Member", payrate=0)

    seedRoles = [roleMember, roleEmployee, roleManager, roleOwner]
    _ = [db.session.add(role) for role in seedRoles]

    db.session.commit()
    seed_users(roleOwner, roleManager, roleEmployee, roleMember)
