import { observable } from "mobx";
import ApiService from "../../services/ApiService";
import UserStore from "../../stores/UserStore";

class ProfileStore {
    @observable firstname = "Kermet";
    @observable lastname = "Krab";
    @observable birthday = new Date().toISOString().split('T')[0];
    @observable gender = "trans";
    @observable email = "kermit_krab@hotmail.com";
    @observable address = "sesame street, 4074, brisbane, queensland";
    @observable mobile = "+61466999666";
    @observable editable = true;

    getData() {
        UserStore.isAuthenticating = true;
        ApiService.get('/profile')
            .then(JSON.parse)
            .then(res => res.Message)
            .then(profile => {
                this.firstname = profile.first_name;
                this.lastname = profile.last_name;
                this.birthday = new Date(profile.birthday);
                this.mobile = profile.phone_number;
            })
            .then(() => UserStore.isAuthenticating = false);

    }

    save() {
        UserStore.isAuthenticating = true;        
        ApiService.put('/profile', {
            first_name: this.firstname,
            last_name: this.lastname,
            birthday: this.birthday,
            phone_number: this.mobile
        })
            .then(() => UserStore.isAuthenticating = false);
    }
}

export default new ProfileStore();