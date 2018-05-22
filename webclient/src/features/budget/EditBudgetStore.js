import { observable } from "mobx";
import ApiService from "../../services/ApiService";

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
        ApiService.put('/budget', {
            name: EditBudgetStore.name,
            description: EditBudgetStore.description, //'This is my main budget.',
            amount: EditBudgetStore.amount, //1000,
            frequency: EditBudgetStore.frequency, //1,
            timeunit: EditBudgetStore.timeunit //'monthly'
        })
            .then(console.log)
            .catch(alert)
    }
}

export default new EditBudgetStore();