import { observable } from "mobx";
import ApiService from "../../services/ApiService";
import BudgetStore from "./BudgetStore";

class EditBudgetStore {
    @observable id = undefined;
    @observable name = "";
    @observable description = "";
    @observable amount = 0;
    @observable frequency = 0;
    @observable timeunit = "";
    @observable endDate = undefined;
    @observable oneOff = false;

    getData(id) {
    }
}

export default new EditBudgetStore();