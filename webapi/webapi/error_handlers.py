import falcon
import peewee

from webapi.database import database


class CatchAllHandler(Exception):
    @staticmethod
    def handle(ex, request, response, params):
        ''' Called if an exception has not been handled. Logs the exception. '''
        if isinstance(ex, falcon.HTTPError):
            # Don't log stack trace for invalid requests
            raise ex

        database.rollback()
        raise falcon.HTTPInternalServerError(type(ex).__name__, str(ex))


class DoesNotExistHandler(Exception):
    @staticmethod
    def handle(ex, request, response, params):
        ''' Called if a resource is not found. Returns 404. '''
        raise falcon.HTTPNotFound()


def register_error_handlers(app):
    ''' Register error handlers. '''
    app.add_error_handler(Exception, CatchAllHandler.handle)
    app.add_error_handler(peewee.DoesNotExist, DoesNotExistHandler.handle)