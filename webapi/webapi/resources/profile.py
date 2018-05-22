import json

class ProfileCollection(object):
    def on_get(self, request, response):
        response.media = json.dumps({ 'Message': 'your profile' })