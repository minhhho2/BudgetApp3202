import { observable } from "mobx";
import ApiService from "../../services/ApiService";
import UserStore from "../../stores/UserStore";
import BudgetStore from "./BudgetStore";

class TxStore {
    @observable id = undefined;
    @observable amount = 0;
    @observable description = "";
    @observable dt = undefined;
    @observable mult = 1;
    @observable isOther = false;

    getData(id) {
        ApiService.get(`/transaction/${id}`)
            .then(JSON.parse)
            .then(res => res.Message)
            .then(tx => {
                this.id = tx.id;
                this.amount = tx.amount;
                this.description = tx.description;
                this.dt = tx.dt;
            });
    }

    create() {
        UserStore.isAuthenticating = true;
        ApiService.put('/transaction', {
            amount: (this.amount * this.mult),
            description: this.description,
            dt: this.dt
        })
            .then(() => BudgetStore.getTransactions())
            .catch(err => alert(err.message))
            .then(() => UserStore.isAuthenticating = false)
    }

    delete(id) {
        ApiService.delete(`/transaction/${id}`)
            .then(_ => BudgetStore.transactions = BudgetStore.transactions.filter(tx => tx.id !== id))
            .catch(err => alert(err.message));
    }

    update() {
        ApiService.post(`/transaction/${this.id}`, {
            id: this.id,
            description: this.description,
            amount: this.amount,
            dt: this.dt
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
        this.id = undefined;
        this.mult = 1;
        this.amount = 0;
        this.description = "";
        this.dt = undefined;
        this.isOther = false;
    }
}

export default new TxStore();