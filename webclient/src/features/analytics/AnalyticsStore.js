import { observable } from "mobx";
import ApiService from "../../services/ApiService";

class AnalyticsStore {
    @observable age = false;
    @observable gender = false;
    @observable data = undefined;
    @observable userData = ["User", "", "", ""];
    @observable globalData = ["Global", "", "", ""];
    @observable hasData = false;

    clear() {
        this.age = false;
        this.gender = false;
        this.data = undefined;
        this.userData = ["User", "", "", ""];
        this.ageglobalData = ["Global", "", "", ""];    
    }

    sanitize() {
        this.userData =
            this.userData.map(v => isNaN(v) ? v : Math.round(v * 100)/100);
        this.globalData =
            this.globalData.map(v => isNaN(v) ? v : Math.round(v * 100)/100);
    }

    getData(age, gender) {
        ApiService.post(`/compare`, {
            age: age,
            gender: gender
        })
            .then(JSON.parse)
            .then(res => res.Message)
            .then(data => {
                const { user_data, average_global_data } = data;
                this.userData = ["User", user_data.weekly_saving_goals, user_data.weekly_income, user_data.weekly_expenses ]
                this.globalData = ["User", average_global_data.weekly_saving_goals, average_global_data.weekly_income, average_global_data.weekly_expenses ]
            })
            .then(() => this.sanitize());
    }
}



export default new AnalyticsStore();