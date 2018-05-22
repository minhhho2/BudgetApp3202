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

    create() {
        UserStore.isAuthenticating = true;
        BudgetStore.expenseModal = false;
        console.log(this.endDate)
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
            .then(console.log)
            .then(() => BudgetStore.getExpenses())
            .catch(console.log)
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
        ApiService.post(`/expense/${id}`, {
            id: this.id,
            description: this.description,
            amount: this.amount
        });
    }

    clear() {
        this.name = '';
        this.description = '';
        this.amount = 0;
    }
}

export default new ExpenseStore();