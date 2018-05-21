import { observable } from "mobx";
import ApiService from "../../services/ApiService";
import EditBudgetStore from "./EditBudgetStore";

class BudgetStore {
    @observable budgets = [];
    @observable incomes = [];
    @observable expenses = [];
    @observable txModal = false;

    addRow() {
        console.log(this);
        this.incomes.push({
            Description: "",
            Goal: 0
        });
    }

    save() {
        ApiService.put('/budget', {
            name: EditBudgetStore.name,
            description: EditBudgetStore.description, //'This is my main budget.',
            amount: EditBudgetStore.amount, //1000,
            frequency: EditBudgetStore.frequency, //1,
            timeunit: EditBudgetStore.timeunit //'monthly'
        }).then(console.log)
    }

    getBudgets() {
        ApiService.get('/budget')
            .then(JSON.parse)
            .then(budgets => {
                this.budgets = budgets["Message"];
            })
    }

    deleteBudget(id) {
        ApiService.delete(`/budget/${id}`)
            .then(_ => {
                this.budgets =
                    this.budgets.filter(b => b.id !== id);
            })
            .catch(_ => alert("Couldn't delete!"));
    }
}

export default new BudgetStore();