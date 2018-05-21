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

    handleChange = (e, { value }) => {
        OverviewStore.charts = value;
        console.log(Array.apply(null, OverviewStore.charts));
        

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

    }

    render() {
        const chartOptions = [
            { key: '1', value: 'pie', text: 'pie' },
            { key: '2', value: 'radar', text: 'radar' },
            { key: '3', value: 'line', text: 'line'},
        ]; 

        const charts = OverviewStore.charts.map((chart, index) => {
            return <div><canvas ref={chart} key={index} id={chart} height={'200'} width={'300'}></canvas></div>
        });
        
        return (
            <div>
                <Dropdown multiple selection 
                    options={chartOptions} 
                    placeholder='Select your chart' 
                    onChange={this.handleChange}
                    value={Array.apply(null, OverviewStore.charts)}
                /> 

                {charts}

            </div >
        );
    }
}