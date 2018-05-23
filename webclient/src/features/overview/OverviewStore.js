import { observable } from "mobx";
import BudgetStore from "../budget/BudgetStore";

class OverviewStore {
    @observable incomes = 0;
    @observable expenses = 0;
    @observable inflow = 0;
    @observable outflow = 0;

    @observable chartType = [];
    @observable dataType = [];

    @observable charts = [];
    
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
        Apiservice.get('analytics/0').then(JSON.parse)
            .then(res => res.Message)
            .then(incomes = this.incomes = incomes);
        return this.incomes;
    }

    getExpenses() {
        Apiservice.get('analytics/1').then(JSON.parse)
            .then(res => res.Message)
            .then(expenses = this.expenses = expenses);
        return this.expenses;
    }

    getInflow() {
        Apiservice.get('analytics/2').then(JSON.parse)
            .then(res => res.Message)
            .then(inflow = this.inflow = inflow);
        return this.inflow;
    }
    getOutflow() {
        Apiservice.get('analytics/2').then(JSON.parse)
            .then(res => res.Message)
            .then(outflow = this.outflow = outflow);
        return this.outflow;
    }



    /*
    0 = income
    1 = expense
    2 = oneoffinflow
    3 = oneoffoutflow
    */
}

export default new OverviewStore();