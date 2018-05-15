import { observable } from "mobx";
import Transaction from "../transaction/Transaction";
import Budget from "../budget/Budget";

class DashboardStore {
    @observable visible = true;
    @observable transactions = [
        new Transaction(1, "income", "food", 200, new Date()),
        new Transaction(2, "expense", "fuel", 50, new Date()),
        new Transaction(3, "income", "food", 300, new Date()),
        new Transaction(4, "expense", "food", 100, new Date())
    ];
    @observable budgets = [
        new Budget(1, "fuel", "daily", 0),
        new Budget(2, "fuel", "daily", 1),
        new Budget(3, "fuel", "daily", 10),
        new Budget(4, "fuel", "daily", 100)
    ];
    @observable balance = 0;

    getTransactionType(type) {
        return this.transactions.filter(el => el.type === type);
    }
    addBudget(budget) {
        var budgets = this.budgets.slice();
        budgets.push(budget);
        this.budgets = budgets;
        console.log(this.budgets);
    }

    addTransaction(transaction) {
        var transactions = this.transactions.slice();
        transactions.push(transaction);
        this.transactions = transactions;
        console.log(this.transactions);
    }

}

export default new DashboardStore();