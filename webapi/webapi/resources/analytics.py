import json
import falcon

from webapi.models import Income, Expense, Transaction

class AnalyticsRepository():
    def __init__(self, income_model=Income, expense_model=Expense, transaction_model=Transaction):
        self._Income = income_model
        self._Expense = expense_model
        self._Transaction = transaction_model

    def _serialise(self, obj):
        freq = obj.frequency if obj.frequency > 0 else 1
        timeunit = obj.timeunit if len(obj.timeunit) > 0 else 'Annually'

        amount = obj.amount * freq
        if timeunit == 'Daily':
            amount *= 7
        if timeunit == 'Monthly':
            amount /= 4
        if timeunit == 'Annually':
            amount /= 52
                
        return {
            'amount': amount,
            'description': obj.description
        }

    def get_weight_adjusted_incomes(self, user_id: int):
        incomes = self._Income.select().where(self._Income.user_id==user_id)
        return [self._serialise(inc) for inc in incomes]

    def get_weight_adjusted_expenses(self, user_id: int):
        expenses = self._Expense.select().where(self._Expense.user_id==user_id)
        return [self._serialise(ex) for ex in expenses]

    def get_weight_adjusted_transactions(self, user_id: int, incoming):
        transactions = self._Transaction.select().where(self._Transaction.user_id==user_id)
        transaction_dict = dict()
        for tx in transactions:
            transaction_dict[tx.description] = tx.amount + transaction_dict.get(tx.description, 0)

        txs = []
        for key in transaction_dict.keys():
            txs.append({ 'description': key, 'amount': transaction_dict[key] })

        if incoming:
            return [ tx for tx in txs if tx['amount'] < 0]
        else:
            return [ tx for tx in txs if tx['amount'] > 0]
        

class AnalyticsCollection(object):
    def __init__(self, analytics_repo=AnalyticsRepository()):
        self._analytics_repo = analytics_repo

    def on_get(self, request, response, id: int):
        user_id = int(request.cookies['budgetapp_login'])
        data = []

        if id == 0:
            data = self._analytics_repo.get_weight_adjusted_incomes(user_id)
        if id == 1:
            data = self._analytics_repo.get_weight_adjusted_expenses(user_id)
        if id == 2:
            data = self._analytics_repo.get_weight_adjusted_transactions(user_id, True)
        if id == 3:
            data = self._analytics_repo.get_weight_adjusted_transactions(user_id, False)            

        response.media = json.dumps({ 'Success': True, 'Message': data })