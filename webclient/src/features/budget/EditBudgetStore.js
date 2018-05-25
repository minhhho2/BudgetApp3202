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
            description: this.description,
            amount: this.amount,
            frequency: this.frequency,
            timeunit: this.timeunit,
            end_date: this.endDate
        })
            .then(() => BudgetStore.getBudgets())
            .catch(err => {
                alert(err.message)
            })
            .then(() => UserStore.isAuthenticating = false)
    }

    update() {
        UserStore.isAuthenticating = true;
        ApiService.post(`/budget/${this.id}`, {
            name: this.name,
            description: this.description,
            amount: this.amount,
            frequency: this.frequency,
            timeunit: this.timeunit,
            end_date: this.endDate
        })
            .then(() => BudgetStore.getBudgets())
            .catch(err => alert(err.message))
            .then(() => UserStore.isAuthenticating = false);
        BudgetStore.editBudgetModal = false;
    }

    reset() {
        this.id = undefined;
        this.name = "";
        this.description = "";
        this.amount = 0;
        this.frequency = 0;
        this.timeunit = 0;
        this.endDate = undefined;
        this.oneOff = 1;
    }


}

export default new EditBudgetStore();