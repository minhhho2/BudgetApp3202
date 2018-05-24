import { observable } from "mobx";
import BudgetStore from "../budget/BudgetStore";
import ApiService from "../../services/ApiService";

class OverviewStore {
    @observable incomes = 0;
    @observable expenses = 0;
    @observable inflows = 0;
    @observable outflows = 0;

    @observable chartType = '';
    @observable dataType = '';

    getData() {

        Promise.all([
            BudgetStore.getExpenses(),
            BudgetStore.getIncomes(),
            BudgetStore.getBudgets()
        ]).then(() => {
            this.incomes = BudgetStore.incomes;
            this.expenses = BudgetStore.expenses;
            this.budgets = BudgetStore.BudgetStore;
            this.charts = [];
        });

        console.log("GET DATA FOR OVERVIEW STORE");
    }

    getIncomes() {
        ApiService.get('/analytics/0')
            .then(JSON.parse)
            .then(res => res.Message)
            .then(incomes => {
                this.incomes = incomes
            }
        );
        return this.incomes.toJS();
    }

    getExpenses() {
        ApiService.get('/analytics/1')
            .then(JSON.parse)
            .then(res => res.Message)
            .then(expenses => {
                this.expenses = expenses
            }
        );
        return this.expenses.toJS();
    }


    getInflow() {
        ApiService.get('/analytics/2')
            .then(JSON.parse)
            .then(res => res.Message)
            .then(inflows => {
                this.inflows = inflows
            }
        );
        console.log(this.inflows);
        //return this.inflows.toJS();
        
    }
    getOutflow() {
        ApiService.get('/analytics/3')
            .then(JSON.parse)
            .then(res => res.Message)
            .then(outflows => {
                this.outflows = outflows
            }
        );
        return this.outflows.toJS();
    }
}

export default new OverviewStore();