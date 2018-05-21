import { observable } from "mobx";
import ApiService from "../../services/ApiService";

class TxStore {
    @observable txs = [];
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
}

export default new TxStore();