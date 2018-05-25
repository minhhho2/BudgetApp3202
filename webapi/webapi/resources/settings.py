import json
import falcon

from webapi.models import UserSettings

class SettingsRepository:
    def __init__(self, user_settings_model=UserSettings):
        self._UserSettings = UserSettings

    def _serialise_settings(self, settings):
        return {
            'text_notification': settings.text_notification,
            'email_notification': settings.email_notification,
            'share_data': settings.share_data
        }

    def update_settings(self, media: dict, user_id: int):
        settings = self._UserSettings.get(self._UserSettings.user_id==user_id)

        settings.text_notification = media.get('text_notification', False)
        settings.email_notification = media.get('email_notification', False)
        settings.share_data = media.get('share_data', False)

        settings.save()
        return self._serialise_settings(settings)

    def get_settings(self, user_id: int):
        settings = self._UserSettings.get(self._UserSettings.user_id==user_id)
        return self._serialise_settings(settings)

class SettingsCollection(object):
    def __init__(self, settings_repo=SettingsRepository()):
        self._settings_repo = settings_repo

    def on_get(self, request, response):
        user_id = int(request.cookies['budgetapp_login'])
        response.media = json.dumps({ 'Success': True, 'Message': self._settings_repo.get_settings(user_id) })

    def on_post(self, request, response):
        user_id = int(request.cookies['budgetapp_login'])
        response.media = json.dumps({ 'Success': True, 'Message': self._settings_repo.update_settings(request.media, user_id) })