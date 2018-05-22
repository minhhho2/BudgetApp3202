import json
from webapi.resources.user import UserResource, AuthResource
from webapi.resources.budget import BudgetResource, BudgetCollection
from webapi.resources.transaction import TransactionCollection, TransactionResource
from webapi.resources.income import IncomeCollection, IncomeResource
from webapi.resources.expense import ExpenseCollection, ExpenseResource

class RootResource(object):
    def on_get(self, request, response):
        ''' GET / '''
        # touch the database
        # pull out a budget
        # put in body
        response.body = json.dumps({ 'Success': True, 'Message': 'Budgets here' })

routes = [
    ('/', RootResource),
    ('/user', UserResource),
    ('/auth', AuthResource),
    ('/income', IncomeCollection),
    ('/income/{id:int}', IncomeResource),
    ('/transaction', TransactionCollection),
    ('/transaction/{id:int}', TransactionResource),
    ('/expense', ExpenseCollection),
    ('/expense/{id:int}', ExpenseResource),
    ('/expense', ExpenseResource),
    ('/budget', BudgetCollection),
    ('/budget/{id:int}', BudgetResource),
]

def register_routes(app):
    ''' Register routes. '''
    for path, resource in routes:
        app.add_route(path, resource())
