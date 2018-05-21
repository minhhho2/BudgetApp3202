import { observable } from "mobx";

class OverviewStore {
    @observable incomes = 0;
    @observable expenses = 0;
    @observable budgets = 0;
    @observable charts = [];

    @observable testData = 0;
    @observable testOption = 0;

    getData() {
        this.incomes = [];
        this.expenses = [];
        this.budgets = [];
        this.charts = [];

        console.log("GET DATA FOR OVERVIEW STORE");
        /* Do for data */
    }

}

export default new OverviewStore();