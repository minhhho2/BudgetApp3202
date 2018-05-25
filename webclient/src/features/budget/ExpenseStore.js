import { observable } from "mobx";
import ApiService from "../../services/ApiService";
import BudgetStore from "./BudgetStore";
import UserStore from "../../stores/UserStore";

class ExpenseStore {
    @observable id = 1;
    @observable name = '';
    @observable amount = 0;
    @observable description = '';
    @observable timeunit = '';
    @observable frequency = 0;
    @observable hasEndDate = false;
    @observable endDate = new Date();
    @observable isOther = false;

    getData(id) {
        ApiService.get(`/expense/${id}`)
            .then(JSON.parse)
            .then(res => res.Message)
            .then(expense => {
                this.id = expense.id;
                this.name = expense.name;
                this.amount = expense.amount;
                this.description = expense.description;
                this.timeunit = expense.timeunit;
                this.frequency = expense.frequency;
                this.endDate = expense.endDate;
            });
    }

    create() {
        UserStore.isAuthenticating = true;
        BudgetStore.expenseModal = false;

        ApiService.put('/expense', {
            name: this.name,
            amount: this.amount,
            description: this.description,
            frequency: this.frequency,
            timeunit: this.timeunit,
            end_date: this.hasEndDate ?
                this.endDate :
                undefined
        })
            .then(() => BudgetStore.getExpenses())
            .catch(err => alert(err.message))
            .then(() => UserStore.isAuthenticating = false)
    }

    delete(id) {
        ApiService.delete(`/expense/${id}`)
            .then(_ => BudgetStore.expenses = BudgetStore.expenses.filter(expense => expense.id !== id))
            .catch(err => alert(err.message));
    }

    getExpense(id) {
        ApiService.get(`/expense/${id}`)
            .then(res => res.Message)
            .then(expense => {
                this.id = expense.id;
                this.amount = expense.amount;
                this.description = expense.description;
            });
    }


    update() {
        ApiService.post(`/expense/${this.id}`, {
            name: this.name,
            amount: this.amount,
            description: this.description,
            timeunit: this.timeunit,
            frequency: this.frequency,
            end_date: this.endDate
        })
            .then(() => BudgetStore.getExpenses())
            .catch(err => alert(err.message))
            
        BudgetStore.editExpenseModal = false;
    }

    clear() {
        this.name = '';
        this.description = '';
        this.amount = 0;
        this.frequency = 0;
        this.timeunit = "";
        this.endDate = undefined
    }
}

export default new ExpenseStore();