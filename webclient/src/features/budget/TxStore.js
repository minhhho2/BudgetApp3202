import { observable } from "mobx";
import ApiService from "../../services/ApiService";
import UserStore from "../../stores/UserStore";
import BudgetStore from "./BudgetStore";

class TxStore {
    @observable id = 1;
    @observable mult = 1;
    @observable amount = 0;
    @observable description = "";
    @observable isOther = false;

    create() {
        const amount = this.amount * this.mult;
        UserStore.isAuthenticating = true;
        BudgetStore.txModal = false;
        ApiService.put('/transaction', {
            amount,
            description: this.description
        })
            .then(() => BudgetStore.getTransactions())
            .then(() => UserStore.isAuthenticating = false)
            .catch(() => UserStore.isAuthenticating = false)
    }

    delete(id) {
        ApiService.delete(`/transaction/${id}`)
            .then(_ => BudgetStore.transactions = BudgetStore.transactions.filter(tx => tx.id !== id))
            .catch(err => alert(err.message));
    }

    getTransactions() {
        ApiService.get('/transaction')
            .then(res => res.Message)
            .then(txs => this.txs = txs);
    }

    getTransaction(id) {
        ApiService.get(`/transaction/${id}`)
            .then(res => res.Message)
            .then(tx => {
                this.id = tx.id;
                this.amount = tx.amount;
                this.description = tx.description;
            });
    }

    update() {
        ApiService.post(`/transaction/${id}`, {
            id: this.id,
            description: this.description,
            amount: this.amount
        });
    }

    clear() {
        this.description = '';
        this.amount = 0;
        this.mult = 1;
        this.isOther = false;
    }
}

export default new TxStore();