import { observable } from "mobx";
import AuthModel from "./AuthModel";
import ApiService from "../../services/ApiService";
import UserStore from "../../stores/UserStore";

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
        UserStore.isAuthenticating = true;
        ApiService.post('/user', { username, password })
            .then(res => {
                UserStore.setUser(res)
                UserStore.isAuthenticating = true;
            })
            .catch(err => console.log(err))
            .finally(() => UserStore.isAuthenticating = false);
    }
}
export default new LoginStore();