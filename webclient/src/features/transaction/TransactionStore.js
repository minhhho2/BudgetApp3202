import { observable } from "mobx";

class TransactionStore {
    @observable type = "income";
    @observable category = "misc";
    @observable amount = 0;
    @observable date = this.formatDate(new Date());
    @observable isOpen = false;
    
    formatDate(date) { return date.toISOString().split('T')[0]; }
}

export default new TransactionStore();