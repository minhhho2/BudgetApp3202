import { observable } from "mobx";
import AuthModel from "./AuthModel";

class LoginStore {
    @observable credentials = new AuthModel();
    @observable validationErrors = [];

    validate() {
        this.validationErrors = [];
        const { username, password } = this.credentials;
        if (username.length < 6) {

        }
        if (password.length < 6) {

        }
    }

    signIn() {
        const errors = this.validate();
        if (this.validationErrors.length > 0) {
            return;
        }
        const { username, password } = this.credentials;
    }
}
export default new LoginStore();