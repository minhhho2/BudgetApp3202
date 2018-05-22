import { observable } from "mobx";
import ApiService from "../../services/ApiService";

class IncomeStore {
    @observable id = 1;
    @observable amount = 0;
    @observable description = "";
    @observable timeunit = '';
    @observable frequency = 0;

    create() {
        const amount = this.amount * this.mult;
        ApiService.put('/income', {
            amount,
            description: this.description
        })
    }

    update() {
        ApiService.post(`/income/${id}`, {
            amount,
            description: this.description
        }) 
    }

    delete(id) {
        ApiService.delete(`/income/${id}`)
            .then(_ => this.incomes = this.incomes.filter(income => income.id !== id))
            .catch(err => alert(err.message));
    }

    getIncome(id) {
        ApiService.get(`/income/${id}`)
            .then(res => res.Message)
            .then(income => {
                this.id = income.id;
                this.amount = income.amount;
                this.description = income.description;
            });
    }

    clear() {
        this.name = '';
        this.description = '';
        this.amount = 0;
    }
}

export default new IncomeStore();