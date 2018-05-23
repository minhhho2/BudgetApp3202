import { observable } from "mobx";

class AnalyticsStore {
    @observable age = 0;
    @observable type = "";
    @observable description = "";
}

export default new AnalyticsStore();