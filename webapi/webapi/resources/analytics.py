import json
import falcon

from webapi.models import Income, Expense

class AnalyticsRepository():
    def __init__(self, income_model=Income, expense_model=Expense):
        self._Income = income_model
        self._Expense = Expense

    def _serialise(self, obj):
        amount = obj.amount * obj.frequency
        if obj.timeunit == 'Daily':
            amount *= 7
        if obj.timeunit == 'Monthly':
            amount /= 4
        if obj.timeunit == 'Annually':
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

        response.media = json.dumps({ 'Success': True, 'Message': data })