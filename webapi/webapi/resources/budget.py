import json
import falcon
import datetime

from webapi.models import User, Budget, Income, Expense
from webapi.resources.user import UserRepository

class BudgetRepository():
    def __init__(self, user_repo=UserRepository(), budget_model=Budget, income_model=Income, expense_model=Expense):
        self._user_repo = user_repo
        self._Budget = budget_model
        self._Income = income_model
        self._Expense = expense_model

    def _serialise_tx(self, income):
        end_date = income.end_date.isoformat() if income.end_date else None
        return {
            'name': income.name,
            'description': income.description,
            'amount': income.amount,
            'frequency': income.frequency,
            'timeunit': income.timeunit,
            'end_date': end_date
        }

    def get_incomes(self):
        return [self._serialise_tx(i) for i in self._Income.select()]

    def get_expenses(self):
        return [self._serialise_tx(e) for e in self._Expense.select()]

    def _serialise_budget(self, budget):
        return self._serialise_tx(budget)

    def get_budgets(self, user_id: int):
        budgets = self._Budget.select().where(self._Budget.user_id == user_id)
        return [self._serialise_budget(b) for b in budgets]

    def create_budget(self, user_id, budget: dict):
        budget = self._Budget.create(user_id=user_id,
            name=budget['name'],
            description=budget['description'],
            amount=budget['amount'],
            frequency=budget['frequency'],
            timeunit=budget['timeunit'],
            end_date=datetime.datetime.now())
        budget.save()

        return self._serialise_budget(budget)

    def update_budget(self):
        pass

    def create_income(self, media: dict):
        pass

    def create_expense(self, media: dict):
        pass

class IncomeResource(object):
    def __init__(self, budget_repo=BudgetRepository()):
        self._budget_repo = budget_repo

    def on_put(self, request, response):
        self._budget_repo.create_income(request.media)
        response.media = json.dumps({ 'Success': True })

    def on_get(self, request, response):
        incomes = self._budget_repo.get_incomes()
        response.media = json.dumps({ 'Success': True, 'Message': incomes })

class ExpenseResource(object):
    def __init__(self, budget_repo=BudgetRepository()):
        self._budget_repo = budget_repo

    def on_put(self, request, response):
        self._budget_repo.create_expense(request.media)
        response.media = json.dumps({ Success: True })

    def on_get(self, request, response):
        expenses = self._budget_repo.get_expenses()
        response.media = json.dumps({ 'Success': True, 'Message': expenses })

class BudgetResource(object):
    def __init__(self, budget_repo=BudgetRepository()):
        self._budget_repo = budget_repo

    def on_get(self, request, response):
        user_id = int(request.cookies['budgetapp_login'])
        budgets = self._budget_repo.get_budgets(user_id)
        response.media = json.dumps({ 'Success': True, 'Message': budgets })

    def on_put(self, request, response):
        user_id = int(request.cookies['budgetapp_login'])
        budget = self._budget_repo.create_budget(user_id, request.media)
        response.media = json.dumps({ 'Success': True, 'Message': budget })

    def on_post(self, request, response):
        response.media = json.dumps({ 'Success': True, 'Message': 'Budget updated.' })
