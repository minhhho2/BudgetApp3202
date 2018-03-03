from webapi.database import database

class DatabaseConnectionMiddleware():
    ''' Process each request in a database transaction. '''

    def process_resource(self, request, response, resource, params):
        if database.is_closed():
            database.connect()
        database.begin()

    def process_response(self, request, response, resource, req_succeeded):
        database.commit()
        database.close()