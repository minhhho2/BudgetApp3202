import json
import falcon
import datetime

from webapi.models import User, Expense
from webapi.resources.user import UserRepository

class ExpenseRepository():
    def __init__(self, user_repo=UserRepository(), expense_model=Expense):
        self._user_repo = user_repo
        self._Expense = expense_model

    def _serialise_expense(self, expense):
        end_date = expense.end_date.isoformat() if expense.end_date else None
        return {
            'id': expense.id,
            'name': expense.name,
            'description': expense.description,
            'amount': expense.amount,
            'frequency': expense.frequency,
            'timeunit': expense.timeunit,
            'end_date': end_date
        }

    def get_expenses(self, user_id: int):
        expenses = self._Expense.select().where(self._Expense.user_id == user_id)
        return [ self._serialise_expense(expense) for expense in expenses ]

    def get_expense(self, id: int):
        expense = self._Expense.get(_expense.id == id)
        return self._serialise_expense(expense)

    def create_expense(self, media: dict, user_id: int):
        expense = self._Expense.create(user_id=user_id,
            name=media['name'],
            description=media['description'],
            amount=media['amount'],
            frequency=media['frequency'],
            timeunit=media['timeunit'],
            dt=datetime.datetime.now())
        expense.save()

        return self._serialise_expense(expense)

    def update_expense(self, media: dict, id: int):
        expense = self.get_expense(id)
        expense.name
        expense.description = media['description']
        expense.amount = media['amount']
        expense.frequency = media['frequency']
        expense.timeunit = media['timeunit']
        expense.dt = media['dt']
        expense.save()

        return self._serialise_expense(expense)

    def delete_expense(self, id: int):
        (self._expense
            .delete()
            .where(self._Expense.id == id)
            .execute())

class ExpenseCollection(object):
    def __init__(self, expense_repo=ExpenseRepository()):
        self._expense_repo = expense_repo

    def on_get(self, request, response):
        user_id = int(request.cookies['budgetapp_login'])
        response.media = json.dumps({ 'Success': True, 'Message': self._expense_repo.get_expenses(user_id) })

    def on_put(self, request, response):
        user_id = int(request.cookies['budgetapp_login'])
        response.media = json.dumps({ 'Success': True, 'Message': self._expense_repo.create_expense(request.media, user_id) })


class ExpenseResource(object):
    def __init__(self, expense_repo=ExpenseRepository()):
        self._expense_repo = expense_repo

    def on_get(self, request, response, id: int):
        response.media = json.dumps({ 'Success': True, 'Message': self._expense_repo.get_expense(id) })

    def on_post(self, request, response, id: int):
        response.media = json.dumps({ 'Success': True, 'Message': self._expense_repo.update_expense(request.media, id) })

    def on_delete(self, request, response, id: int):
        self._expense_repo.delete_expense(id)
        response.media = json.dumps({ 'Success': True })