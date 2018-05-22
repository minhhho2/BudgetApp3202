import { observable } from "mobx";
import ApiService from "../../services/ApiService";
import EditBudgetStore from "./EditBudgetStore";

class BudgetStore {
    @observable budgets = [];
    @observable incomes = [];
    @observable expenses = [];
    @observable transactions = [];

    @observable txModal = false;
    @observable expenseModal = false;
    @observable incomeModal = false;
    @observable editBudgetModal = false;

    addRow() {
        this.incomes.push({
            Description: "",
            Goal: 0
        });
    }

    getBudgets() {
        ApiService.get('/budget')
            .then(JSON.parse)
            .then(budgets => {
                this.budgets = budgets["Message"];
            })
    }

    getIncomes() {
        ApiService.get('/income')
            .then(incomes => this.incomes = incomes);
    }


    getExpenses() {
        ApiService.get('/expense')
            .then(expenses => this.expenses = expenses);
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