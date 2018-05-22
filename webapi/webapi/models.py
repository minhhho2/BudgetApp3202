from peewee import (Model, TextField, BooleanField, DateTimeField, IntegerField, FloatField,
                    ForeignKeyField)

from webapi.database import database

class BaseModel(Model):
    class Meta:
        database = database

class User(BaseModel):
    class Meta:
        db_table = 'users'

    id = IntegerField()
    user_name = TextField()
    first_name = TextField()
    last_name = TextField()
    password_hash = TextField()

class Budget(BaseModel):
    class Meta:
        db_table = 'budgets'

    id = IntegerField()
    user = ForeignKeyField(User)
    name = TextField()
    description = TextField()
    amount = FloatField()
    frequency = IntegerField()
    timeunit = TextField()
    end_date = DateTimeField()

class Income(BaseModel):
    class Meta:
        db_table = 'incomes'

    user = ForeignKeyField(User)
    name = TextField()
    description = TextField()
    amount = FloatField()
    frequency = IntegerField()
    timeunit = TextField()
    end_date = DateTimeField()

class Expense(BaseModel):
    class Meta:
        db_table = 'expenses'

    user = ForeignKeyField(User)
    name = TextField()
    description = TextField()
    amount = FloatField()
    frequency = IntegerField()
    timeunit = TextField()
    end_date = DateTimeField()

class Transaction(BaseModel):
    class Meta:
        db_table = 'transactions'

    user = ForeignKeyField(User)
    description = TextField()
    amount = FloatField()
    dt = DateTimeField()

class PersonalInformation(BaseModel):
    class Meta:
        db_table = 'personal_information'

    user = ForeignKeyField(User)
    first_name = TextField()
    last_name = TextField()
    phone_number = TextField()
    birthday = DateTimeField()