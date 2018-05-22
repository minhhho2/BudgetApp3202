import { observable } from "mobx";
import ApiService from "../../services/ApiService";
import BudgetStore from "./BudgetStore";
import UserStore from "../../stores/UserStore";

class IncomeStore {
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
        BudgetStore.incomeModal = false;

        ApiService.put('/income', {
            name: this.name,
            amount: this.amount,
            description: this.description,
            frequency: this.frequency,
            timeunit: this.timeunit,
            end_date: this.hasEndDate ?
                this.endDate :
                undefined
        })
            .then(() => BudgetStore.getIncomes())
            .catch(console.log)
            .then(() => UserStore.isAuthenticating = false)
    }

    delete(id) {
        ApiService.delete(`/income/${id}`)
            .then(_ => BudgetStore.incomes = BudgetStore.incomes.filter(income => income.id !== id))
            .catch(err => alert(err.message));
    }

    getincome(id) {
        ApiService.get(`/income/${id}`)
            .then(res => res.Message)
            .then(income => {
                this.id = income.id;
                this.amount = income.amount;
                this.description = income.description;
            });
    }

    update() {
        ApiService.post(`/income/${id}`, {
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

export default new IncomeStore();