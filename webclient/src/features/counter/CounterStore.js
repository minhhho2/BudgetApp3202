import { observable } from "mobx";
import ApiService from "../../services/ApiService";
import UserStore from "../../stores/UserStore";

class CounterStore {
    @observable count = 0;
    @observable message = '';

    testAuthenticate() {
        UserStore.isAuthenticating = true;
        (new Promise(r => setTimeout(r, 1500)))
            .then(res => {
                UserStore.isAuthenticating = false;
            });
    }
}
export default new CounterStore();