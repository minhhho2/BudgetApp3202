import json
import falcon

from webapi.models import UserSettings

class SettingsRepository:
    def __init__(self, user_settings_model=UserSettings):
        self._UserSettings = UserSettings

    def _serialise_settings(self, settings):
        return {}

    def update_settings(self, media: dict, user_id: int):
        settings = self._UserSettings.get(self._UserSettings.user_id==user_id)

        settings.text_notification = media['text_notification']
        settings.email_notification = media['email_notification']
        settings.share_data = media['share_data']

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
        return self._settings_repo.get_settings(user_id)

    def on_post(self, request, response):
        user_id = int(request.cookies['budgetapp_login'])
        return self._settings_repo.update_settings(request.media, user_id)
