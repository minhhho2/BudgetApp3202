import { observable } from "mobx";
import ApiService from "../../services/ApiService";
import UserStore from "../../stores/UserStore";

class SettingStore {
    @observable emails = true;
    @observable texts = true;
    @observable sharing = true;
    @observable availableNotifications = [];

    getSettings() {
        ApiService.get('/settings')
            .then(JSON.parse)
            .then(res => res.Message)
            .then(settings => {
                this.emails = settings.email_notification;
                this.texts = settings.text_notification;
                this.sharing = settings.share_data;
            });
    }

    saveSettings() {
        UserStore.isAuthenticating = true;
        ApiService.post('/settings', {
            email_notification: this.emails,
            text_notification: this.texts,
            share_data: this.sharing
        })
            .then(JSON.parse)
            .then(res => res.Message)
            .then(() => this.getSettings())
            .catch(err => alert(err.message))
            .then(() => UserStore.isAuthenticating = false);
    }
}

export default new SettingStore();