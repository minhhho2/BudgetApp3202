import { observable } from "mobx";

class UserStore {
    @observable username = '';
    @observable amountLeftToSpend = 0;
}