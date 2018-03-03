import { observable } from "mobx";
import AuthModel from "./AuthModel";

class RegisterStore {
    @observable credentials = new AuthModel();
    @observable validationErrors = [];

    validate() {
        const { username, password, passwordConfirm } = this.credentials;
        if (username.length < 6) {
        }
        if (newPassword.length < 6) {
        }
        if (newPasswordConfirm.length < 6) {
        }
        if (newPassword !== newPasswordConfirm) {
        }
    }

    register() {
        this.validationErrors = [];        
        const errors = this.validate();
        if (validationErrors.length > 0) {
            return;
        }

        /* Registration Logic */
    }
}
export default new RegisterStore();