import { observable } from "mobx";
import ApiService from "../../services/ApiService";

class CounterStore {
    @observable count = 0;
    @observable message = '';

    getHelloMessage() {
        ApiService.get('/')
            // Get pulls out { Success: true, Message: "Hello, Minh" }
            .then(({ Success, Message }) => this.message = Message);
    }
}
export default new CounterStore();