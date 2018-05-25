import { observable } from "mobx";
import BudgetStore from "../budget/BudgetStore";
import ApiService from "../../services/ApiService";

class OverviewStore {

    @observable chartType = '';
    @observable dataType = '';
    @observable hasChart = false;
    @observable chart = undefined;
    @observable data = [];


    getIncomes() {
        return ApiService.get('/analytics/0')
            .then(JSON.parse)
            .then(res => res.Message)
            .then(incomes => this.data = incomes);
    }

    getExpenses() {
        return ApiService.get('/analytics/1')
            .then(JSON.parse)
            .then(res => res.Message)
            .then(expenses => this.data = expenses);
    }

    getInflow() {
        return ApiService.get('/analytics/2')
            .then(JSON.parse)
            .then(res => res.Message)
            .then(inflows => this.data = inflows);
    }
    getOutflow() {
        return ApiService.get('/analytics/3')
            .then(JSON.parse)
            .then(res => res.Message)
            .then(outflows => this.data = outflows);
    }
}

export default new OverviewStore();