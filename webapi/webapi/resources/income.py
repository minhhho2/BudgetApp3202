import json
import falcon
import datetime

from webapi.models import User, Income
from webapi.resources.user import UserRepository

class IncomeRepository():
    def __init__(self, user_repo=UserRepository(), income_model=Income):
        self._user_repo = user_repo
        self._Income = income_model

    def _serialise_income(self, income):
        end_date = income.end_date.isoformat() if income.end_date else None
        return {
            'id': income.id,
            'name': income.name,
            'description': income.description,
            'amount': income.amount,
            'frequency': income.frequency,
            'timeunit': income.timeunit,
            'end_date': end_date
        }

    def get_incomes(self, user_id: int):
        incomes = self._Income.select().where(self._Income.user_id == user_id)
        return [ self._serialise_income(income) for income in incomes ]

    def get_income(self, id: int):
        income = self._Income.get(_income.id == id)
        return self._serialise_income(income)

    def create_income(self, media: dict, user_id: int):
        income = self._Income.create(user_id=user_id,
            name=media['name'],
            description=media['description'],
            amount=media['amount'],
            frequency=media['frequency'],
            timeunit=media['timeunit'],
            dt=datetime.datetime.now())
        income.save()

        return self._serialise_income(income)

    def update_income(self, media: dict, id: int):
        income = self.get_income(id)
        income.description = media['description']
        income.amount = media['amount']
        income.frequency = media['frequency']
        income.timeunit = media['timeunit']
        income.dt = media['dt']
        income.save()

        return self._serialise_income(income)

    def delete_income(self, id: int):
        (self._Income
            .delete()
            .where(self._Income.id == id)
            .execute())

class IncomeCollection(object):
    def __init__(self, income_repo=IncomeRepository()):
        self._income_repo = income_repo

    def on_get(self, request, response):
        user_id = int(request.cookies['budgetapp_login'])
        response.media = json.dumps({ 'Success': True, 'Message': self._income_repo.get_incomes(user_id)})

    def on_put(self, request, response):
        user_id = int(request.cookies['budgetapp_login'])
        response.media = json.dumps({ 'Success': True, 'Message': self._income_repo.create_income(request.media, user_id)})


class IncomeResource(object):
    def __init__(self, income_repo=IncomeRepository()):
        self._income_repo = income_repo

    def on_get(self, request, response, id: int):
        response.media = json.dumps({ 'Success': True, 'Message': self._income_repo.get_income(id) })

    def on_post(self, request, response, id: int):
        response.media = json.dumps({ 'Success': True, 'Message': self._income_repo.update_income(request.media, id) })

    def on_delete(self, request, response, id: int):
        self._income_repo.delete_income(id)
        response.media = json.dumps({ 'Success': True })