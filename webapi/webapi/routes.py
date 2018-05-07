import json
from webapi.resources.user import UserResource, AuthResource
from webapi.resources.budget import BudgetResource, IncomeResource, ExpenseResource
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
    ('/income', IncomeResource),
    ('/expense', ExpenseResource),
    ('/budget', BudgetResource),
]

def register_routes(app):
    ''' Register routes. '''
    for path, resource in routes:
        app.add_route(path, resource())
