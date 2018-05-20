import * as React from "react";
import { Button, Dropdown } from 'semantic-ui-react'
import { observer } from "mobx-react";

import OverviewStore from "./OverviewStore";
import Chart from 'chart.js';

@observer
export default class OverviewView extends React.Component {

    componentDidMount() {
        OverviewStore.getData();

        let chartCanvas = this.refs.chart;
        let myChart = new Chart(chartCanvas, {
            type: 'radar',
            data: JSON.parse(JSON.stringify(OverviewStore.testData)),
            options: JSON.parse(JSON.stringify(OverviewStore.testOption))
        });
    }

    handleChange = (e, { value }) => {
        OverviewStore.charts = value;
        console.log(Array.apply(null, OverviewStore.charts));
    }

    render() {

        const chartOptions = [
            { key: '1', value: 'pie', text: 'pie' },
            { key: '2', value: 'radar', text: 'radar' },
        ]; // OverviewStore.chartOptions.map((chart, index) => <Dropdown.Item key={index} value={chart} text={chart} /> );

        const values = ['swish']
        
        return (
            <div>
                <Dropdown multiple selection 
                    options={chartOptions} 
                    placeholder='Select your chart' 
                    onChange={this.handleChange}
                    value={Array.apply(null, OverviewStore.charts)}
                /> 
                <canvas ref={'chart'} height={'200'} width={'300'}></canvas>
            </div >
        );
    }
}