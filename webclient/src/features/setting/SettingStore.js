import { observable } from "mobx";

class SettingStore {
    @observable emails = 0;
    @observable texts = 0;
    @observable sharing = 0;

    getSetting() {
        console.log("GET SETTING");
        // TODO: implement api for settings - get current settings of user from api
        /*
        ApiService.get('/setting').then(JSON.parse)
            .then(settings => {
                this.settings = settings;
            })
        */
    }

    saveSetting() {
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