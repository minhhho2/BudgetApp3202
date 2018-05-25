from webapi.models import User, PersonalInformation, UserSettings
import json
import falcon
import bcrypt

class UserRepository():
    def __init__(self, user_model=User, personal_info_model=PersonalInformation, user_settings=UserSettings):
        self._User = user_model
        self._PersonalInformation = personal_info_model
        self._UserSettings = user_settings

    def register_user(self, first_name, last_name, username, password):
        password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        user = self._User.create(user_name=username,
                                 password_hash=password,
                                 first_name=first_name,
                                 last_name=last_name)
        user.save()

        self._PersonalInformation.create(user_id=user.id,
            first_name='',
            last_name='',
            birthday=None,
            phone_number='')

        self._UserSettings.create(user_id=user.id,
            text_notification=False,
            email_notification=False,
            share_data=False)

        return self._serialise_user(user)

    def validate_credentials(self, username, password):
        user = self._User.select().where(self._User.user_name == username).first()
        is_valid = bcrypt.checkpw(password.encode('utf-8'), user.password_hash.encode('utf-8'))
        if not user or not is_valid:
            return None
        return self._serialise_user(user)

    def get_user(self, user_id):
        user = self._User.get(self._User.id == user_id)
        return self._serialise_user(user)

    def _serialise_user(self, user: User):
        return {
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'user_name': user.user_name
        }

class UserResource(object):
    def __init__(self, user_repo=UserRepository()):
        self._user_repo = user_repo

    def on_get(self, request, response):
        id = request.media['id']

    def on_put(self, request, response):
        ''' Register '''
        first_name = request.media.get('first_name', '')
        last_name = request.media.get('last_name', '')
        username = request.media['username']
        password = request.media['password']

        if first_name is None or last_name is None:
            response.media = json.dumps({ 'Success': False, 'Message': 'Empty first or last name' })
            raise falcon.HTTPStatus(falcon.HTTP_OK)

        if username is None or password is None:
            response.media = json.dumps({ 'Success': False, 'Message': 'Empty username or password' })
            raise falcon.HTTPStatus(falcon.HTTP_OK)

        id = self._user_repo.register_user(first_name, last_name, username, password)
        response.media = json.dumps({ 'Success': True, 'Message': id })

    def on_post(self, request, response):
        response.media = json.dumps({ 'Success': False, 'Message': 'Invalid credentials.' })
        
        username, password = request.media['username'], request.media['password']
        user = self._user_repo.validate_credentials(username, password)
        if not user or user is None:
            return
        else:
            response.set_cookie('budgetapp_login', str(user['id']))
            response.media = json.dumps({ 'Success': True, 'Message': user })

class AuthResource(object):
    def __init__(self, user_repo=UserRepository()):
        self._user_repo = user_repo

    def on_get(self, request, response):
        cookies = request.cookies
        user_id = None
        if 'budgetapp_login' in cookies:
            user_id = int(cookies['budgetapp_login'])

        if user_id is not None:
            user = self._user_repo.get_user(user_id)
            response.media = json.dumps({ 'Success': True, 'Message': user})
        else:
            response.media = json.dumps({ 'Success': False, 'Message': 'You are not logged in.'})

    def on_post(self, request, response):
        response.unset_cookie('budgetapp_login')
        raise falcon.HTTPStatus(falcon.HTTP_OK)
