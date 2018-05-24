import { observable } from "mobx";
import BudgetStore from "../budget/BudgetStore";
import ApiService from "../../services/ApiService";

class OverviewStore {
    @observable incomes = [];
    @observable expenses = [];
    @observable inflows = [];
    @observable outflows = [];

    @observable chartType = '';
    @observable dataType = '';

    getIncomes() {
        ApiService.get('/analytics/0')
            .then(JSON.parse)
            .then(res => res.Message)
            .then(incomes => this.incomes = incomes);
        return this.incomes.toJS();
    }

    getExpenses() {
        ApiService.get('/analytics/1')
            .then(JSON.parse)
            .then(res => res.Message)
            .then(expenses => this.expenses = expenses);
        return this.expenses.toJS();
    }

    getInflow() {
        ApiService.get('/analytics/2')
            .then(JSON.parse)
            .then(res => res.Message)
            .then(inflows => { this.inflows = inflows });
        return this.inflows;

    }
    getOutflow() {
        ApiService.get('/analytics/3')
            .then(JSON.parse)
            .then(res => res.Message)
            .then(outflows => this.outflows = outflows);
        return this.outflows.toJS();
    }
}

export default new OverviewStore();