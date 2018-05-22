import { observable } from "mobx";
import BudgetStore from "../budget/BudgetStore";

class OverviewStore {
    @observable incomes = 0;
    @observable expenses = 0;
    @observable budgets = 0;
    @observable charts = [];

    @observable testData = 0;
    @observable testOption = 0;
    @observable chartOptions = ['pie', 'radar', 'line', 'bar'];

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
}

export default new OverviewStore();