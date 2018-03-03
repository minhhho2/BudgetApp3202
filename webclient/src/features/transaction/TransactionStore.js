import { observable } from "mobx";

class TransactionStore {
    @observable type = "income";
    @observable amount = 0;
    @observable date = this.formatDate(new Date());

    testMethod() {
        // does nothing
    }

    formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    addTransaction() {

    }
}

export default new TransactionStore();