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
    }
}

export default new EditBudgetStore();