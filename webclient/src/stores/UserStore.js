import { observable } from "mobx";

class User {
    @observable id = 0;
    @observable first_name = '';
    @observable last_name = '';
    @observable user_name = '';

    constructor(user) {
        const { id, first_name, last_name, user_name } = user;
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.user_name = user_name;
    }
}

class UserStore {
    @observable isAuthenticating = false;
    @observable user = undefined;
    @observable amountLeftToSpend = 0;

    setUser(user) {
        this.user = new User(user);
    }
}
export default new UserStore();