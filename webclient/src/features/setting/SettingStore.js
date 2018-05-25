import { observable } from "mobx";

class SettingStore {
    @observable emails = 0;
    @observable texts = 0;
    @observable sharing = 0;
    @observable availableNotifications = [];

    getSettings() {
        ApiService.get('/setting').then(JSON.parse)
            .then(settings => {
                this.emails = emails;
                this.texts = texts;
                this.sharing = sharing;
                this.notifications = notifications;
            });
    }

    saveSettings() {
        ApiService.put('/setting', {
            emails: this.emails,
            texts: this.texts,
            sharing: this.sharing
        });
    }
}

export default new SettingStore();