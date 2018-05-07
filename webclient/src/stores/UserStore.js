import { observable } from "mobx";

class User {
    constructor(id, name, roles=[], tokens=undefined) {
        this.id = id;
        this.name = name;
        this.roles = roles;

        if (tokens) this.tokens = tokens;
    }
}

class UserStore {
    @observable isAuthenticating = false;
    @observable user = new User(1, "minh", ["admin"]);
    @observable amountLeftToSpend = 0;

    setUser() {
        this.user = new User(1, "name", []);
    }
}
export default new UserStore();