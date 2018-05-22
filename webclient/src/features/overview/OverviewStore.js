import { observable } from "mobx";

class OverviewStore {
    @observable incomes = 0;
    @observable expenses = 0;
    @observable budgets = 0;
    @observable charts = [];

    @observable testData = 0;
    @observable testOption = 0;
    @observable chartOptions = ['pie', 'radar', 'line', 'bar'];
    
    getData() {
        this.incomes = [
            { description: "csiro", amount: 150 },
            { description: "csiro", amount: 150 },
            { description: "youth", amount: 75 },
            { description: "dividends", amount: 100 },
        ];

        this.expenses = [
            { description: "fuel", amount: 100 },
            { description: "fuel", amount: 100 },
            { description: "food", amount: 100 },
            { description: "social", amount: 100 },
            { description: "etc.", amount: 100 },
        ];

        this.budgets = [];

        console.log("GET DATA FOR OVERVIEW STORE");
        /* Do for data */
    }

}

export default new OverviewStore();

/*

var testData = {
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

var testOption = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
}

        
Object.values(this.refs).forEach(canvas => {
    let myChart = new Chart(canvas, {
        type: canvas.id,
        data: testData,
        options: testOption
    });
}); 

*/