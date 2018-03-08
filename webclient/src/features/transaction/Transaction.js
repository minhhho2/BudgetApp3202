export default class Transaction {
    constructor(id, type, category, amount, date) {
        this.id = id;
        this.type = type;
        this.category = category;
        this.amount = amount;
        this.date = date;
    }

    getDateString() { return this.date.toISOString().split('T')[0]; }

    toString() {
        return (this.id + " - " + this.type + " - " + this.category + 
        " - " + this.amount + " - " + this.date.toString());
    }
}