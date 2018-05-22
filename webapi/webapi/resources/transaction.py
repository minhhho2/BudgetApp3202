import json
import falcon
import datetime

from webapi.models import User, Transaction
from webapi.resources.user import UserRepository

class TransactionRepository():
    def __init__(self, user_repo=UserRepository(), transaction_model=Transaction):
        self._user_repo = user_repo
        self._Transaction = transaction_model

    def _serialise_tx(self, tx):
        dt = tx.dt.isoformat() if tx.dt else None
        return {
            'id': tx.id,
            'description': tx.description,
            'amount': tx.amount,
            'dt': dt
        }

    def get_transactions(self, user_id: int):
        transactions = self._Transaction.select().where(self._Transaction.user_id == user_id)
        return [ self._serialise_tx(tx) for tx in transactions ]

    def get_transaction(self, id: int):
        tx = self._Transaction.get(_Transaction.id == id)
        return self._serialise_tx(tx)

    def create_transaction(self, media: dict, user_id: int):
        tx = self._Transaction.create(user_id=user_id,
            description=media['description'],
            amount=media['amount'],
            dt=datetime.datetime.now())
        tx.save()

        return self._serialise_tx(tx)

    def update_transaction(self, media: dict, id: int):
        tx = self.get_transaction(id)
        tx.description = media['description']
        tx.amount = media['amount']
        tx.dt = media['dt']
        tx.save()

        return self._serialise_tx(tx)

    def delete_transaction(self, id: int):
        (self._Transaction
            .delete()
            .where(self._Transaction.id == id)
            .execute())

    def do_we_sms(self):
        return False

class TransactionCollection(object):
    def __init__(self, tx_repo=TransactionRepository()):
        self._tx_repo = tx_repo

    def on_get(self, request, response):
        user_id = int(request.cookies['budgetapp_login'])
        response.media = json.dumps({ 'Success': True, 'Message': self._tx_repo.get_transactions(user_id) })

    def on_put(self, request, response):
        user_id = int(request.cookies['budgetapp_login'])
        response.media = json.dumps({ 'Success': True, 'Message': self._tx_repo.create_transaction(request.media, user_id) })

class TransactionResource(object):
    def __init__(self, tx_repo=TransactionRepository()):
        self._tx_repo = tx_repo

    def on_get(self, request, response, id: int):
        response.media = json.dumps({ 'Success': True, 'Message': self._tx_repo.get_transaction(id) })

    def on_post(self, request, response, id: int):
        response.media = json.dumps({ 'Success': True, 'Message': self._tx_repo.update_transaction(request.media, id) })

    def on_delete(self, request, response, id: int):
        self._tx_repo.delete_transaction(id)
        response.media = json.dumps({ 'Success': True })