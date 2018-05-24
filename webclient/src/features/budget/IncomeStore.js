import { observable } from "mobx";
import ApiService from "../../services/ApiService";
import BudgetStore from "./BudgetStore";
import UserStore from "../../stores/UserStore";

class IncomeStore {
    @observable id = undefined;
    @observable name = '';
    @observable amount = 0;
    @observable description = '';
    @observable timeunit = '';
    @observable frequency = 0;
    @observable hasEndDate = false;
    @observable endDate = undefined;
    @observable isOther = false;

    getData(id) {
        ApiService.get(`/income/${id}`)
            .then(JSON.parse)
            .then(res => res.Message)
            .then(income => {
                this.id = income.id;
                this.name = income.name;
                this.amount = income.amount;
                this.description = income.description;
                this.timeunit = income.timeunit;
                this.frequency = income.frequency;
                this.endDate = income.endDate;
            });

        console.log("getting income store data");
    }

    create() {
        UserStore.isAuthenticating = true;

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


    update() {
        ApiService.post(`/income/${this.id}`, {
            name: this.name,
            amount: this.amount,
            description: this.description,
            timeunit: this.timeunit,
            frequency: this.frequency,
            end_date: this.endDate
        })
            .then(() => BudgetStore.getIncomes())
            .catch(err => alert(err.message))            
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

export default new IncomeStore();