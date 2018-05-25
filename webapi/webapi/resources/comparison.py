import json
import falcon
import datetime

from webapi.models import Income, Expense, Transaction, Budget, PersonalInformation, User, UserSettings
from webapi.resources.analytics import AnalyticsRepository

class ComparisonRepository():
    def __init__(self, income_model=Income, expense_model=Expense,
        budget_model=Budget, profile_model=PersonalInformation, user_settings_model=UserSettings,
        user_model=User, analytics_repo=AnalyticsRepository()):

        self._Income = income_model
        self._Expense = expense_model
        self._Budget = budget_model
        self._PersonalInformation = PersonalInformation
        self._UserSettings = user_settings_model
        self._User = user_model
        self._analytics_repo = analytics_repo

    def get_data(self, media: dict, user_id: int):
        personal_info = self._PersonalInformation.get(self._PersonalInformation.user_id==user_id)
        user_count = self._User.select().count()

        global_savings_goals = self._Budget.select()
        own_savings_goals = global_savings_goals.where(self._Budget.user_id==user_id);

        global_incomes = self._Income.select()
        own_incomes = global_incomes.where(self._Income.user_id==user_id)
        
        global_expenses = self._Expense.select()
        own_expenses = global_expenses.where(self._Expense.user_id==user_id)
        
        sharing_ids = [u.user_id for u in self._UserSettings.select().where(self._UserSettings.share_data)]

        user_filter = self._PersonalInformation.select().where(self._PersonalInformation.user_id in sharing_ids)
        try:
            if personal_info.gender is not None and media.get('gender', False):
                user_filter = user_filter.where(self._PersonalInformation.gender==personal_info.gender)
            if personal_info.birthday is not None and media.get('age', False):
                user_filter = user_filter.where(self._PersonalInformation.birthday.year == personal_info.birthday.year)
        except Exception as e:
            user_filter = user_filter
        finally:
            user_filter = [u.user_id for u in user_filter]
        
        global_savings_goals = global_savings_goals.where(self._Budget.user_id in user_filter)
        global_incomes = global_incomes.where(self._Income.user_id in user_filter)
        global_expenses = global_expenses.where(self._Expense.user_id in user_filter)

        global_weekly_savings_goal = sum([self._analytics_repo._serialise(b)['amount'] for b in global_savings_goals])/user_count
        global_weekly_income = sum([self._analytics_repo._serialise(i)['amount'] for i in global_incomes])/user_count
        global_weekly_expense = sum([self._analytics_repo._serialise(e)['amount'] for e in global_expenses])/user_count

        own_weekly_savings_goal = sum([self._analytics_repo._serialise(b)['amount'] for b in own_savings_goals])
        own_weekly_income = sum([self._analytics_repo._serialise(i)['amount'] for i in own_incomes])
        own_weekly_expense = sum([self._analytics_repo._serialise(e)['amount'] for e in own_expenses])

        return {
            'user_data': {
                'weekly_saving_goals': own_weekly_savings_goal,
                'weekly_income': own_weekly_income,
                'weekly_expenses': own_weekly_expense
            },
            'average_global_data': {
                'weekly_saving_goals': global_weekly_savings_goal,
                'weekly_income': global_weekly_income,
                'weekly_expenses': global_weekly_expense
            }
        }

class ComparisonCollection(object):
    def __init__(self, comparison_repo=ComparisonRepository()):
        self._comparison_repo = comparison_repo

    def on_post(self, request, response):
        user_id = int(request.cookies['budgetapp_login'])
        response.media = json.dumps({ 'Success': True, 'Message': self._comparison_repo.get_data(request.media, user_id) })