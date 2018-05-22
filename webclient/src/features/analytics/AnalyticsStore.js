import { observable } from "mobx";

class AnalyticsStore {
    @observable age = 0;
    @observable type = "";
}

export default new AnalyticsStore();