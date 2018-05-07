import falcon
import falcon_cors
import falcon_multipart.middleware

from webapi.config import config
from webapi.database import init_database
from webapi.middleware.cors import CorsMiddleware
from webapi.middleware.empty_resource import EmptyResponseMiddleware
from webapi.middleware.database_connection import DatabaseConnectionMiddleware
from webapi.error_handlers import register_error_handlers
from webapi.media_handlers import register_media_handlers
from webapi.routes import register_routes

init_database()

def create_middleware():
    return [
        CorsMiddleware(),
        DatabaseConnectionMiddleware(),
        falcon_multipart.middleware.MultipartMiddleware()
    ]

def create_app(middleware=None):
    if middleware is None:
        middleware = create_middleware()

    app = falcon.API(middleware=middleware)

    register_error_handlers(app)
    register_media_handlers(app)
    register_routes(app)

    return app
