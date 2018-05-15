import { observable } from "mobx";
import Budget from "./Budget";

class BudgetStore {
    @observable isOpen = open;
    @observable category = "";
    @observable frequency = "";
    @observable goal = "";
    
    @observable budgets = [
        new Budget(1, "fuel", "daily", 2000),
        new Budget(2, "fuel", "daily", 9999)
    ];
}

export default new BudgetStore();