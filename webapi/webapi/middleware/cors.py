import falcon
import falcon_cors

from webapi.config import config

class CorsMiddleware(falcon_cors.CORSMiddleware):
    ''' Handle CORS. '''
    def __init__(self):
        cors = falcon_cors.CORS(allow_all_origins=True,
                                allow_credentials_all_origins=True,
                                allow_all_headers=True,
                                allow_all_methods=True)
        super().__init__(cors)

    def process_resource(self, request, response, resource, params):
        super().process_resource(request, response, resource, params)

        # Raise 200 for OPTIONS requests so middleware lower in the stack are skipped
        if request.method == 'OPTIONS':
            raise falcon.HTTPStatus(falcon.HTTP_OK)
