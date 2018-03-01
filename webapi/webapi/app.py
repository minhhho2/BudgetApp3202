import falcon
import falcon_cors
import falcon_multipart.middleware

from webapi.config import config
from webapi.database import init_database
from webapi.middleware.database_connection import DatabaseConnectionMiddleware
from webapi.error_handlers import register_error_handlers
from webapi.media_handlers import register_media_handlers
from webapi.routes import register_routes

init_database()

def create_middleware():
    cors = falcon_cors.CORS(allow_all_origins=True,
                            allow_all_headers=True,
                            allow_all_methods=True)

    return [
        cors.middleware,
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