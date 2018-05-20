import { observable } from "mobx";

class OverviewStore {
    @observable incomes = 0;
    @observable expenses = 0;
    @observable budgets = 0;
    @observable chartOptions = ['pie', 'radar', 'line'];
    @observable charts = [];

    @observable testData = 0;
    @observable testOption = 0;

    getData() {
        this.incomes = [];
        this.expenses = [];
        this.budgets = [];
        this.charts = ['pie'];

        this.testData = {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'
                ],
                borderWidth: 1
            }]
        }

        this.testOption = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
        console.log("GET DATA FOR OVERVIEW STORE");

        /* Do for data */
    }

}

export default new OverviewStore();