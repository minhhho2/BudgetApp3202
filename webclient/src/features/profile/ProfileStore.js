import { observable } from "mobx";

class ProfileStore {
    @observable firstname = "Kermet"
    @observable lastname = "Krab"
    @observable birthday = new Date().toISOString().split('T')[0];
    @observable gender = "trans";

    @observable email = "kermit_krab@hotmail.com";
    @observable address = "sesame street, 4074, brisbane, queensland";
    @observable mobile = "+61466999666";

    @observable editable = true;

    getData() {
        console.log("get details");
    }

    save() {
        console.log("save details");
    }
}

export default new ProfileStore();