from peewee import (Model, TextField, BooleanField, DateTimeField, IntegerField, FloatField,
                    ForeignKeyField)

from webapi.database import database

class BaseModel(Model):
    class Meta:
        database = database

class User(BaseModel):
    class Meta:
        db_table = 'user'

    user_name = TextField()
    first_name = TextField()
    last_name = TextField()
    password_hash = TextField()