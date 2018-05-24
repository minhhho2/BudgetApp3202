import { observable } from "mobx";
import ApiService from "../../services/ApiService";
import UserStore from "../../stores/UserStore";
import BudgetStore from "./BudgetStore";

class TxStore {
    @observable id = 1;
    @observable amount = 0;
    @observable description = "";
    @observable dt = undefined;
    @observable mult = 1;
    @observable isOther = false;

    getData(id) {
        ApiService.get(`/transaction/${id}`)
            .then(res => res.Message)
            .then(tx => {
                this.id = tx.id;
                this.amount = tx.amount;
                this.description = tx.description;
            });
    }

    create() {
        UserStore.isAuthenticating = true;
        ApiService.put('/transaction', {
            amount: (this.amount * this.mult),
            description: this.description
            //dt: new Date()         // defaulted to undefined for now
        })
            .then(console.log)
            .then(() => BudgetStore.getTransactions())
            .catch(console.log)
            .then(() => UserStore.isAuthenticating = false)
    }

    delete(id) {
        ApiService.delete(`/transaction/${id}`)
            .then(_ => BudgetStore.transactions = BudgetStore.transactions.filter(tx => tx.id !== id))
            .catch(err => alert(err.message));
    }

    update() {
        ApiService.post(`/transaction/${id}`, {
            id: this.id,
            description: this.description,
            amount: this.amount
        })
            .then(() => BudgetStore.getTransactions())
            .catch(err => alert(err.message))
    }

    getTransactions() {
        ApiService.get('/transaction')
            .then(res => res.Message)
            .then(txs => this.txs = txs);
    }

    clear() {
        this.id = 1;
        this.mult = 1;
        this.amount = 0;
        this.description = "";
        this.isOther = false;
    }
}

export default new TxStore();