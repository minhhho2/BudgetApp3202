from webapi.models import User
import json
import falcon
import bcrypt

class UserRepository():
    def __init__(self, user_model=User):
        self._User = user_model

    def register_user(self, username, password):
        password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(14))
        user = self._User.create(user_name=username, password_hash=password, first_name='', last_name='')
        user.save()
        return user.id

    def validate_credentials(self, username, password):
        return True
        user = self._User.select().where(self._User.user_name == username).first()
        if user is None:
            return None
        return self._serialise_user(u) #self._serialise_user(user)

    def _serialise_user(self, user: User):
        return {
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'user_name': user.user_name
        }

class AuthResource(object):
    def __init__(self, user_repo=UserRepository()):
        self._user_repo = user_repo

    def on_put(self, request, response):
        ''' Register '''
        username = request.media['username']
        password = request.media['password']
        
        if username is None or password is None:
            response.media = json.dumps({ 'Success': False, 'Message': 'Empty username or password' })
            raise falcon.HTTPStatus(falcon.HTTP_OK)

        id = self._user_repo.register_user(username, password)
        response.media = json.dumps({ 'Success': True, 'Message': id })

    def on_post(self, request, response):
        username, password = request.get_param('username'), request.get_param('password')
        user = self._user_repo.validate_credentials(username, password)
        if user is None:
            response.media = json.dumps({ 'Success': False, 'Message': 'Invalid credentials.' })
        else:
            response.media = json.dumps({ 'Success': True, 'Message': 'Well done' })