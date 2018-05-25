import { observable } from "mobx";
import ApiService from "../../services/ApiService";
import UserStore from "../../stores/UserStore";

class ProfileStore {
    @observable firstname = "";
    @observable lastname = "";
    @observable birthday = new Date().toISOString().split('T')[0];
    @observable gender = "";
    @observable phoneNumber = "";
    @observable emailAddress = "";
    @observable homeAddress = "";
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
                this.gender = profile.gender;
                this.phoneNumber = profile.phone_number;
                this.emailAddress = profile.emailAddress;
                this.homeAddress = profile.homeAddress;
            })
            .then(() => UserStore.isAuthenticating = false);

    }

    save() {
        UserStore.isAuthenticating = true;
        ApiService.put('/profile', {
            first_name: this.firstname,
            last_name: this.lastname,
            birthday: this.birthday,
            gender: this.gender,
            phone_number: this.phoneNumber,
            email_address: this.emailAddress,
            home_address: this.homeAddress
        })
            .then(console.log)
            .then(() => UserStore.isAuthenticating = false)
            .catch(() => UserStore.isAuthenticating = false);
    }
}

export default new ProfileStore();