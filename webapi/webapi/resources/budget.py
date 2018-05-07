from webapi.models import User, Budget, Income, Expense
import json
import falcon

class UserRepository():
    def __init__(self, user_model=User):
        self._User = user_model

class BudgetRepository():
    def __init__(self, user_model=User, budget_model=Budget(), income_model=Income(), expense_model=Expense()):
        self._User = user_model
        self._Budget = budget_model
        self._Income = income_model
        self._Expense = expense_model

    def _serialise_tx(self, income):
            return {
                'name': income['name'],
                'description': income['description'],
                'amount': income['amount'],
                'frequency': income['frequency'],
                'timeunit': income['timeunit'],
                'end_date': income['end_date']
            }

    def get_incomes(self):
        return [self._serialise_tx(i) for i in self._Income.select()]

    def get_expenses(self):
        return [self._serialise_tx(e) for e in self._Expense.select()]
    

    def _serialise_budget(self, budget):
        budget = self._serialise_tx(budget)
        return budget

    def get_budgets(self):
        return [self._serialise_budget(b) for b in self._Budget.select()]

    def create_budget(self):
        pass

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
        budgets = self._budget_repo.get_budgets()
        response.media = json.dumps({ 'Success': True, 'Message': budgets })

    def on_put(self, request, response):
        response.media = json.dumps({ 'Success': True, 'Message': 'Budget created.' })

    def on_post(self, request, response):
        response.media = json.dumps({ 'Success': True, 'Message': 'Budget updated.' })
