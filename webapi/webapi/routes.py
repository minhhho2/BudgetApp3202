import json
from webapi.resources.authentication import AuthResource

class RootResource(object):
    def on_get(self, request, response):
        ''' GET / '''
        # touch the database
        # pull out a budget
        # put in body
        response.body = json.dumps({ 'Success': True, 'Message': 'Budgets' })

routes = [
    ('/', RootResource),
    ('/auth', AuthResource)
]

def register_routes(app):
    ''' Register routes. '''
    for path, resource in routes:
        app.add_route(path, resource())