from webapi.models import User, Budget, Income, Expense
import json
import falcon

class UserRepository():
    def __init__(self, user_model=User):
        self._User = user_model

class BudgetRepository():
    def _init_(self, user_model=User, budget_model=Budget, income_model=Income, expense_model=Expense):
        self._User = user_model
        self._Budget = budget_model

    def create_budget():
        pass

    def update_budget():
        pass

    def create_income(media: dict):
        pass

    def create_expense(media: dict):
        pass

    def get_incomes():
        return []

    def get_expenses():
        return []

class IncomeResource(object):
    def __init__(self, budget_repo=BudgetRepository):
        self._budget_repo = budget_repo

    def on_put(self, request, response):
        self._budget_repo.create_income(request.media)
        response.media = json.dumps({ 'Success': True })

    def on_get(self, request, response):
        incomes = self._budget_repo.get_incomes()
        response.media = json.dumps({ 'Success': True, 'Message': incomes })

class ExpenseResource(object):
    def __init__(self, budget_repo=BudgetRepository):
        self._budget_repo = budget_repo

    def on_put(self, request, response):
        self._budget_repo.create_expense(request.media)
        response.media = json.dumps({ Success: True })

    def on_get(self, request, response):
        incomes = self._budget_repo.get_expenses()
        response.media = json.dumps({ 'Success': True, 'Message': incomes })

class BudgetResource(object):
    def __init__(self, budget_repo=BudgetRepository):
        self._budget_repo = budget_repo

    def on_get(self, request, response):
        response.media = json.dumps({ 'Success': True, 'Message': [] })

    def on_put(self, request, response):
        response.media = json.dumps({ 'Success': True, 'Message': 'Budget created.' })

    def on_post(self, request, response):
        response.media = json.dumps({ 'Success': True, 'Message': 'Budget updated.' })
