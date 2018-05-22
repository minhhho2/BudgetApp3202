import { observable } from "mobx";

class ProfileStore {
    @observable firstname = "Kermet"
    @observable lastname = "Krab"
    @observable age = 19;
    @observable email = "kermit_krab@hotmail.com";
    @observable address = "sesame street, 4074, brisbane, queensland";
    @observable mobile = "+61466999666";
    @observable dob = "19-29-19";
    @observable gender = "trans";

    getData() {
        console.log("get details");
    }

    save() {
        console.log("save details");
    }
}

export default new SettingStore();