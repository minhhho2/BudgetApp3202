import json
import falcon
import datetime
from dateutil import parser, rrule

from webapi.models import User, Transaction, PersonalInformation, Income, Expense, Budget
from webapi.resources.user import UserRepository
from webapi.services.sms import MessageClient

class TransactionRepository():
    def __init__(self, transaction_model=Transaction, personal_information_model=PersonalInformation, 
                       income_model=Income, expense_model=Expense, budget_model=Budget,
                       user_repo=UserRepository(), msg_client=MessageClient()):
        
        self._msg_client = msg_client
        self._user_repo = user_repo
        self._Transaction = transaction_model
        self._PersonalInformation = personal_information_model
        self._Income = income_model
        self._Expense = expense_model
        self._Budget = budget_model

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
        tx = self._Transaction.get(self._Transaction.id == id)
        return self._serialise_tx(tx)

    def create_transaction(self, media: dict, user_id: int):
        dt = dateutil.parser.parse(media['end_date']) if media.get('end_date', False) else datetime.datetime.now()
        tx = self._Transaction.create(user_id=user_id,
            description=media['description'],
            amount=media['amount'],
            dt=dt)
        tx.save()

        if self._do_we_sms(user_id):
            self._send_warning_sms(user_id, media['description'])
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

    def _weekly_val(self, obj):
        amount = obj.amount * obj.frequency
        if obj.timeunit == 'Daily':
            amount *= 7
        if obj.timeunit == 'Monthly':
            amount /= 4
        if obj.timeunit == 'Annually':
            amount /= 52
        return amount

    def _weekly_saving_goal(self, budget):
        budget_end_date = budget.end_date
        today = datetime.datetime.now()

        if budget_end_date < today:
            return 0

        weeks = rrule.rrule(rrule.WEEKLY, dtstart=today, until=budget_end_date).count()
        return budget.amount/weeks


    def _do_we_sms(self, user_id: int):
        budgets = self._Budget.select().where(self._Budget.user_id==user_id)
        savings_goal = sum([self._weekly_saving_goal(b) for b in budgets])

        incomes = self._Income.select().where(self._Income.user_id==user_id)
        incomes = sum([self._weekly_val(x) for x in incomes])

        expenses = self._Expense.select().where(self._Expense.user_id==user_id)
        expenses = sum([self._weekly_val(x) for x in expenses])

        weekly_allowance = incomes - expenses - savings_goal

        weekday = datetime.date.today().weekday()
        start_of_week = datetime.datetime.now() - datetime.timedelta(days=weekday, weeks=1)
        transactions = self._Transaction.select().where(self._Transaction.dt > start_of_week)
        tx_sum = sum([tx.amount for tx in transactions])

        if tx_sum > weekly_allowance:
            return True
        return False

    def _send_warning_sms(self, user_id: int, description: str):
        profile = self._PersonalInformation.get(self._PersonalInformation.user_id==user_id)
        phone_number = profile.phone_number
        self._msg_client.send_sms(f'Your last transaction "{description}" puts you over your weekly allowance', phone_number)

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