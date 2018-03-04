import { observable } from "mobx";

class DashboardStore {
    @observable visible = true;

}

export default new DashboardStore();