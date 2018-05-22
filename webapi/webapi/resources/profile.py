import json
from webapi.models import PersonalInformation
import dateutil.parser

class ProfileRepository():
    def __init__(self, personal_info_model=PersonalInformation):
        self._PersonalInformation = personal_info_model

    def _serialise_personal_info(self, personal_info):
        birthday = personal_info.birthday.isoformat() if personal_info.birthday else None        
        return {
            'first_name': personal_info.first_name,
            'last_name': personal_info.last_name,
            'phone_number': personal_info.phone_number,
            'birthday': birthday
        }

    def update_personal_info(self, media: dict, user_id: int):
        personal_info = self._PersonalInformation.get(self._PersonalInformation.user_id==user_id)

        personal_info.first_name = media['first_name']
        personal_info.last_name= media['last_name']
        personal_info.phone_number= media['phone_number']
        personal_info.birthday= dateutil.parser.parse(media['birthday'])

        personal_info.save()

        return self._serialise_personal_info(personal_info)

    def get_personal_info(self, user_id: int):
        personal_info = self._PersonalInformation.get(self._PersonalInformation.user_id==user_id)
        return self._serialise_personal_info(personal_info)

class ProfileCollection(object):
    def __init__(self, profile_repo=ProfileRepository()):
        self._profile_repo = profile_repo

    def on_get(self, request, response):
        user_id = int(request.cookies['budgetapp_login'])
        response.media = json.dumps({ 'Succes': True, 'Message': self._profile_repo.get_personal_info(user_id) })

    def on_put(self, request, response):
        user_id = int(request.cookies['budgetapp_login'])
        response.media = json.dumps({ 'Success': True, 'Message': self._profile_repo.update_personal_info(request.media, user_id) })        
