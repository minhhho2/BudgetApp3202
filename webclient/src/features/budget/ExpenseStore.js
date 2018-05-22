import { observable } from "mobx";
import ApiService from "../../services/ApiService";

class ExpenseStore {
    @observable expenses = [];

    @observable id = 1;
    @observable amount = 0;
    @observable description = "";
    @observable timeunit = '';
    @observable frequency = 0;

    @observable isOther = false;

    save() {
        const amount = this.amount * this.mult;
        ApiService.put('/expense', {
            amount,
            description: this.description
        })
    }

    delete(id) {
        ApiService.delete(`/expense/${id}`)
            .then(_ => this.expenses = this.expenses.filter(expense => expense.id !== id))
            .catch(err => alert(err.message));
    }

    getexpenses() {
        ApiService.get('/expense')
            .then(res => res.Message)
            .then(expenses => this.expenses = expenses);
    }

    getexpense(id) {
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