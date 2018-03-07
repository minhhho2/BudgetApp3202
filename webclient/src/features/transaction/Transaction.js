export default class Transaction {
    constructor(id, type, category, amount, date) {
        this.id = id;
        this.type = type;
        this.category = category;
        this.amount = amount;
        this.date = date;
    }

    toString() {
        console.log(this.id + " - " + this.type + " - " + this.category + 
        " - " + this.amount + " - " + this.date.toString());
    }
}