import { observable } from "mobx";

class TransactionStore {
    @observable type = "income";
    @observable category = "misc";
    @observable amount = 0;
    @observable date = new Date();
    @observable isOpen = false;
    
    getDateString() { return this.date.toISOString().split('T')[0]; }
}

export default new TransactionStore();