import { observable } from "mobx";

class SettingStore {
    @observable emails = 0;
    @observable texts = 0;
    @observable sharing = 0;
    @observable availableNotifications = [];

    getSettings() {
        console.log("GET SETTING");

        /* Mock Data until api */
        this.emails = 1;
        this.texts = 0;
        this.sharing = 1;
        this.availableNotifications = [
            { key: '0', text: 'reached income', value: 'income_1' },
            { key: '1', text: 'insufficient income', value: 'income_2' },
            { key: '2', text: 'reached expense', value: 'income_3' },
            { key: '3', text: 'insufficient swag', value: 'income_4' },
        ];
        
        /* TODO: implement api for settings - get current settings of user from api
        ApiService.get('/setting').then(JSON.parse)
            .then(settings => {
                this.emails = emails;
                this.texts = texts;
                this.sharing = sharing;
                this.notifications = notifications;
            })
        */
    }

    saveSettings() {
        console.log("SAVE SETTING");
        /* TODO: implement api for saving settings 
        ApiService.put('/setting', {
            emails: this.emails,
            texts: this.texts,
            sharing: this.sharing
        }).then(console.log)
        */
    }
}

export default new SettingStore();