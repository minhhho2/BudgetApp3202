import { observable } from "mobx";

class DashboardStore {
    @observable visible = true;
    @observable transactions = [
        {type: "income", amount: 10, date: new Date()},
        {type: "expense", amount: 100, date: new Date()},
        {type: "income", amount: -1000, date: new Date()},
        {type: "income", amount: 20, date: new Date()},
        {type: "expense", amount: 200, date: new Date()},
        {type: "income", amount: -2000, date: new Date()}
    ];

    getTransactionType(type) {

        return this.transactions.filter(el => el.type === type);

    }

}

export default new DashboardStore();