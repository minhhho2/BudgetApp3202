import { observable } from "mobx";
import Transaction from "../transaction/Transaction";
class DashboardStore {
    @observable visible = true;
    @observable transactions = [
        new Transaction(1, "income", "food", 100, new Date()),
        new Transaction(2, "expense", "fuel", -100, new Date()),
        new Transaction(3, "income", "food", -100, new Date()),
        new Transaction(4, "expense", "food", 100, new Date())
    ];

    getTransactionType(type) {
        return this.transactions.filter(el => el.type === type);
    }

    addTransaction(transaction) {
        var transactions = this.transactions.slice();
        transactions.push(transaction);
        this.transactions = transactions;
        console.log(this.transactions);
    }

}

export default new DashboardStore();