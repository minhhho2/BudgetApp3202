import json
import falcon
import datetime
import dateutil.parser
from webapi.models import Budget, User
from webapi.resources.user import UserRepository

class BudgetRepository():
    def __init__(self, user_repo=UserRepository(), budget_model=Budget):
        self._user_repo = user_repo
        self._Budget = budget_model

    def _serialise_tx(self, tx):
        end_date = tx.end_date.isoformat() if tx.end_date else None
        return {
            'id': tx.id,
            'name': tx.name,
            'description': tx.description,
            'amount': tx.amount,
            'frequency': tx.frequency,
            'timeunit': tx.timeunit,
            'end_date': end_date
        }

    def _serialise_budget(self, budget):
        return self._serialise_tx(budget)

    def get_budget(self, id: int):
        budget = self._Budget.get(self._Budget.id == id)
        return self._serialise_budget(budget)

    def get_budgets(self, user_id: int):
        budgets = self._Budget.select().where(self._Budget.user_id == user_id)
        return [self._serialise_budget(b) for b in budgets]

    def create_budget(self, user_id, budget: dict):
        budget = self._Budget.create(user_id=user_id,
            name=budget['name'],
            description=budget['description'],
            amount=budget['amount'],
            frequency=budget['frequency'],
            timeunit=budget['timeunit'],
            end_date=dateutil.parser.parse(budget['end_date']))
        budget.save()

        return self._serialise_budget(budget)

    def update_budget(self, media: dict, id: int):
        budget = self._Budget.get(self._Budget.id == id)

        budget.name = media['name']
        budget.description = media['description']
        budget.amount = media['amount']
        budget.frequency = media['frequency']
        budget.timeunit = media['timeunit']
        budget.end_date = dateutil.parser.parse(media['end_date'])
        budget.save()

        return self._serialise_budget(budget)

    def delete_budget(self, budget_id: int):
        (self._Budget
            .delete()
            .where(self._Budget.id == budget_id)
            .execute())

class BudgetCollection(object):
    def __init__(self, budget_repo=BudgetRepository()):
        self._budget_repo = budget_repo

    def on_get(self, request, response):
        user_id = int(request.cookies['budgetapp_login'])
        budgets = self._budget_repo.get_budgets(user_id)
        response.media = json.dumps({ 'Success': True, 'Message': budgets })

    def on_put(self, request, response):
        user_id = int(request.cookies['budgetapp_login'])
        budget = self._budget_repo.create_budget(user_id, request.media)
        response.media = json.dumps({ 'Success': True, 'Message': request.media })

    def on_post(self, request, response):
        response.media = json.dumps({ 'Success': True, 'Message': 'Budget updated.' })

class BudgetResource(object):
    def __init__(self, budget_repo=BudgetRepository()):
        self._budget_repo = budget_repo

    def on_get(self, request, response, id: int):
        response.media = json.dumps({ 'Success': True, 'Message': self._budget_repo.get_budget(id) })

    def on_post(self, request, response, id: int):
        response.media = json.dumps({ 'Success': True, 'Message': self._budget_repo.update_budget(request.media, id) })

    def on_delete(self, request, response, id: int):
        self._budget_repo.delete_budget(id)
        response.media = json.dumps({ 'Success': True })