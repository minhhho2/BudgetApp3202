import { observable } from "mobx";
import ApiService from "../../services/ApiService";

class BudgetStore {
    @observable budgets = [];
    @observable incomes = [];
    @observable expenses = [];

    addRow() {
        console.log(this);
        this.incomes.push({
            Description: "",
            Goal: 0
        });
    }

    save() {
        ApiService.put('/budget', {
            name: 'my budget',
            description: 'This is my main budget.',
            amount: 1000,
            frequency: 1,
            timeunit: 'monthly'
        }).then(console.log)
    }

    getBudgets() {
        ApiService.get('/budget')
            .then(JSON.parse)
            .then(budgets => {
                this.budgets = budgets["Message"];
            })
    }
}

export default new BudgetStore();