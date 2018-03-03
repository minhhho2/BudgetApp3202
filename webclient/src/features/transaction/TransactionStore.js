import { observable } from "mobx";

class TransactionStore {
    @observable type = "income";
    @observable amount = 0;
    @observable date = this.formatDate(new Date());
    @observable state = false;

    formatDate(date) { return date.toISOString().split('T')[0]; }
}

export default new TransactionStore();