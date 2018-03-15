import falcon
import stringcase

from webapi import util

class SnakeCaseJsonHandler(falcon.media.json.JSONHandler):
    ''' Convert incoming camelCase field names to snake_case and vice versa. '''

    def deserialize(self, raw):
        if not raw:
            raise falcon.HTTPBadRequest(
                'Invalid request',
                'No request body was provided.')

        return util.change_keys(super().deserialize(raw), stringcase.snakecase)

    def serialize(self, media):
        return super().serialize(util.change_keys(media, stringcase.camelcase))


def register_media_handlers(app):
    ''' Register media handlers. '''
    handlers = falcon.media.Handlers({
        'application/json': SnakeCaseJsonHandler(),
        'application/json; charset=UTF-8': SnakeCaseJsonHandler(),
    })

    app.req_options.media_handlers = handlers
    app.resp_options.media_handlers = handlers