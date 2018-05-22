import * as React from "react";
import { Button, Dropdown } from 'semantic-ui-react'
import { observer } from "mobx-react";

import OverviewStore from "./OverviewStore";
import Chart from 'chart.js';

@observer
export default class OverviewView extends React.Component {

    componentDidMount() {
        OverviewStore.getData();
    }
    componentDidUpdate() {
        const amounts = this.getAmounts();
        const labels = this.getLabels();
        console.log(amounts + labels);

        Object.values(this.refs).forEach(canvas => {
            let myChart = new Chart(canvas, {
                type: canvas.id,
                data: {
                    labels: labels,
                    datasets: [{
                        data: amounts,
                    }]
                },
                options: {
                    responsive: false
                }
            });
        });
    }

    getLabels = () => {
        var labels = [];
        var data = OverviewStore.incomes.map(income => {
            if (!labels.includes(income.description)) {
                labels.push(income.description);
            }
        });
        return labels;
    }

    getAmounts= () => {
        var amounts = [];
        var labels = this.getLabels();
        labels.forEach(label => {
            const results = OverviewStore.incomes.filter(income => label === income.description);
            var sum = results.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.amount;
            }, 0);
            amounts.push(sum);
        })
        return amounts;
    }


    handleChange = (e, { value }) => {
        OverviewStore.charts = value;
    }

    render() {

        const chartOptions = OverviewStore.chartOptions.map((option, index) => {
            return { key: index, value: option, text: option }
        });
        const selectedCharts = OverviewStore.charts.toJS();

        const charts = OverviewStore.charts.map((chart, index) => {
            return <div key={index}>
                <canvas ref={chart} id={chart} height={'300'} width={'300'}></canvas>
            </div>
        });

        return (
            <div>
                <Dropdown multiple selection
                    options={chartOptions}
                    placeholder='Select your chart'
                    onChange={this.handleChange}
                    value={selectedCharts}
                />

                {charts}

            </div >
        );
    }
}
