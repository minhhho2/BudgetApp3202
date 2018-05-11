from webapi.database import database
import falcon

class AuthenticationMiddleware():
    ''' Process each request in a database transaction. '''

    def process_resource(self, request, response, resource, params):
        if request.url.endswith('/user') or request.url.endswith('/auth') or request.url.endswith('/'):
            return
        if 'budgetapp_login' not in request.cookies:
            raise falcon.HTTPStatus(falcon.HTTP_UNAUTHORIZED)
        
        id = int(request.cookies['budgetapp_login'])
        if id <= 0:
            raise falcon.HTTPStatus(falcon.HTTP_UNAUTHORIZED)