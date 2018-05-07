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