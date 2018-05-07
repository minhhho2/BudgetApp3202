import { observable } from "mobx";

class BudgetStore {
    @observable name = "test";
    @observable incomes = [];
    @observable expenses = [];

    addRow() {
        console.log(this);
        this.incomes.push({
            Description: "",
            Goal: 0
        });
    }
}

export default new BudgetStore();