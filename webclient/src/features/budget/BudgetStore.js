import { observable } from "mobx";
import ApiService from "../../services/ApiService";
import EditBudgetStore from "./EditBudgetStore";

class BudgetStore {
    @observable budgets = [];
    @observable incomes = [];
    @observable expenses = [];
    @observable transactions = [];

    @observable editBudgetModal = false;
    @observable editIncomeModal = false;
    @observable editExpenseModal = false;
    @observable editTxModal = false;

    getBudgets() {
        ApiService.get('/budget')
            .then(JSON.parse)
            .then(res => res.Message)
            .then(budgets => {
                this.budgets = budgets;
            })
    }

    getIncomes() {
        return ApiService.get('/income')
            .then(JSON.parse)
            .then(res => res.Message)
            .then(incomes => this.incomes = incomes);
    }


    getExpenses() {
        return ApiService.get('/expense')
            .then(JSON.parse)
            .then(res => res.Message)
            .then(expenses => this.expenses = expenses);
    }

    getTransactions() {
        return ApiService.get('/transaction')
            .then(JSON.parse)
            .then(res => res.Message)
            .then(txs => this.transactions = txs);
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