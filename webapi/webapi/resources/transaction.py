import json
import falcon
import datetime

from webapi.models import User, Transaction
from webapi.resources.user import UserRepository

class TransactionRepository():
    def __init__(self, user_repo=UserRepository(), transaction_model=Transaction):
        self._user_repo = user_repo
        self._Transaction = transaction_model

    def _serialise_tx(self, income):
        end_date = income.end_date.isoformat() if income.end_date else None
        return {
            'id': income.id,
            'name': income.name,
            'description': income.description,
            'amount': income.amount,
            'frequency': income.frequency,
            'timeunit': income.timeunit,
            'end_date': end_date
        }

    def get_transactions(self):
        transactions = []
        return [ self._serialise_tx(tx) for tx in transactions]

    def get_transaction(self, id: int):
        return {}

    def create_transaction(self, media: dict):
        return

    def update_transaction(self, media: dict, id: int):
        return

    def delete_transaction(self, id: int):
        return

class TransactionCollection(object):
    def __init__(self, tx_repo=TransactionRepository()):
        self._tx_repo = tx_repo

    def on_get(self, request, response):
        return self._tx_repo.get_transactions()

    def on_put(self, request, response):
        return self._tx_repo.create_transaction(request.media)


class TransactionResource(object):
    def __init__(self, tx_repo=TransactionRepository()):
        self._tx_repo = tx_repo

    def on_get(self, request, response, id: int):
        return self._tx_repo.get_transaction(id)

    def on_post(self, request, response, id: int):
        return self._tx_repo.update_transaction(request.media, id)

    def on_delete(self, request, response, id: int):
        return self._tx_repo.delete_transaction(id)