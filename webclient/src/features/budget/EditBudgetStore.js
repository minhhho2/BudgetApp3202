import { observable } from "mobx";
import ApiService from "../../services/ApiService";
import UserStore from "../../stores/UserStore";
import BudgetStore from "./BudgetStore";

class EditBudgetStore {
    @observable id = undefined;
    @observable name = "";
    @observable description = "";
    @observable amount = 0;
    @observable frequency = 0;
    @observable timeunit = "";
    @observable endDate = undefined;
    @observable oneOff = 1;

    getData(id) {
        console.log("id in editbudget store is: " + id);
        ApiService.get(`/budget/${id}`)
            .then(JSON.parse)
            .then(res => res.Message)
            .then(budget => {
                this.id = id;
                this.name = budget.name;
                this.description = budget.description;
                this.amount = budget.amount;
                this.frequency = budget.frequency;
                this.timeunit = budget.timeunit;
                this.endDate = budget.endDate;
            })
    }

    create() {
        BudgetStore.editBudgetModal = false;
        UserStore.isAuthenticating = true;

        ApiService.put('/budget', {
            name: this.name,
            description: this.description, //'This is my main budget.',
            amount: this.amount, //1000,
            frequency: this.frequency, //1,
            timeunit: this.timeunit //'monthly'
        })
            .then(() => BudgetStore.getBudgets())
            .catch(() => UserStore.isAuthenticating = false)
            .then(() => UserStore.isAuthenticating = false)
    }

    update() {
        console.log("editbudgetstore: update: " + this.id);
        ApiService.post(`/budget/${this.id}`, {
            name: this.name,
            description: this.description, //'This is my main budget.',
            amount: this.amount, //1000,
            frequency: this.frequency, //1,
            timeunit: this.timeunit, //'monthly'
            endDate: this.endDate
        })
            .then(() => BudgetStore.getBudgets());
        BudgetStore.editBudgetModal = false;
    }
}

export default new EditBudgetStore();