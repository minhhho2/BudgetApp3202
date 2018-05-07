from webapi.models import User
import json
import falcon
import bcrypt

class UserRepository():
    def __init__(self, user_model=User):
        self._User = user_model

    def register_user(self, first_name, last_name, username, password):
        password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        user = self._User.create(user_name=username,
                                 password_hash=password,
                                 first_name=first_name,
                                 last_name=last_name)
        user.save()
        return self._serialise_user(user)

    def validate_credentials(self, username, password):
        user = self._User.select().where(self._User.user_name == username).first()
        if not user:
            return None
        return self._serialise_user(user) #self._serialise_user(user)

    def get_user(self, id):
        user = self._User.get(User.id == id)
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
        first_name = request.media['first_name']
        last_name = request.media['last_name']
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
            response.set_cookie('budgetapp_login', str(user['id']),
                        max_age=3600)
            response.media = json.dumps({ 'Success': True, 'Message': user })

class AuthResource(object):
    def __init__(self, user_repo=UserRepository):
        self._user_repo = user_repo

    def on_get(self, request, response):
        cookies = request.cookies
        my_cookie_value = None
        if 'budgetapp_login' in cookies:
            my_cookie_value = cookies['budgetapp_login']

        if my_cookie_value is not None:
            response.media = json.dumps({ 'Success': True, 'Message': 'You are logged in.'})
        else:
            response.media = json.dumps({ 'Success': False, 'Message': 'You are not logged in.'})