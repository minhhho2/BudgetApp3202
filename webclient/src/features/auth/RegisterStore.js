import { observable } from "mobx";
import AuthModel from "./AuthModel";
import UserStore from "../../stores/UserStore";
import ApiService from "../../services/ApiService";

class RegisterStore {
    @observable credentials = new AuthModel();
    @observable first_name = '';
    @observable last_name = '';
    @observable validationErrors = [];

    validate() {
        const { username, newPassword, newPasswordConfirm } = this.credentials;
        if (username.length < 6) {
            this.validationErrors.push("Username must be 6 chars or longer.")
        }
        if (newPassword.length < 6) {
            this.validationErrors.push("Password must be 6 chars or longer.")
        }
        if (newPassword !== newPasswordConfirm) {
            this.validationErrors.push("Passwords do not match.")
        }
    }

    register() {
        this.validationErrors = [];
        const errors = this.validate();
        if (this.validationErrors.length > 0) {
            this.validationErrors.forEach(err => {
                alert(err);
            })
            return;
        }

        const { username, newPassword } = this.credentials;
        const data = { username, password: newPassword };

        UserStore.isAuthenticating = true;
        ApiService.put('/user', data)
            .then(res => {
                UserStore.isAuthenticating = false;
            });
    }
}
export default new RegisterStore();