import { observable } from "mobx";
import AuthModel from "./AuthModel";
import UserStore from "../../stores/UserStore";
import ApiService from "../../services/ApiService";

class RegisterStore {
    @observable credentials = new AuthModel();
    @observable validationErrors = [];

    validate() {
        const { username, newPassword, newPasswordConfirm } = this.credentials;
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
        if (this.validationErrors.length > 0) {
            return;
        }

        const { username, newPassword } = this.credentials;
        const data = { username, password: newPassword };

        UserStore.isAuthenticating = true;
        ApiService.put('/auth', data)
            .then(res => {
                console.log(res);
                UserStore.isAuthenticating = false;
            });
    }
}
export default new RegisterStore();