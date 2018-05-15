import { observable } from "mobx";

class SettingStore {
    @observable emails = false;
    @observable texts = false;
    @observable sharing = false;
}

export default new SettingStore();