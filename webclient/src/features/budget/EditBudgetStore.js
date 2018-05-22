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
            .then(budget => {
                this.id = id;
                this.name = budget.name;
                this.description = budget.description;
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
}

export default new EditBudgetStore();