import { observable } from "mobx";
import ApiService from "../../services/ApiService";

class TxStore {
    @observable id = 1;
    @observable mult = 1;
    @observable amount = 0;
    @observable description = "";
    @observable isOther = false;

    save() {
        const amount = this.amount * this.mult;
        ApiService.put('/transaction', {
            amount,
            description: this.description
        })
    }

    delete(id) {
        ApiService.delete(`/transaction/${id}`)
            .then(_ => this.txs = this.txs.filter(tx => tx.id !== id))
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