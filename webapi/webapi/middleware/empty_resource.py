import falcon


class EmptyResponseMiddleware():
    ''' If the response body is empty, remove the Content-Type header. Unless the request was an
        OPTIONS request, also set the status code to "204 No Content".
    '''

    def process_response(self, request, response, resource, req_succeeded):
        if response.media is not None or response.body is not None or response.data is not None:
            return

        response.delete_header('Content-Type')

        if request.method == 'OPTIONS':
            return

        response.status = falcon.HTTP_NO_CONTENT