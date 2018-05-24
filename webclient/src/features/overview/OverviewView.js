import * as React from "react";
import { Button, Dropdown, Form, Select } from 'semantic-ui-react'
import { observer } from "mobx-react";

import OverviewStore from "./OverviewStore";
import Chart from 'chart.js';

@observer
export default class OverviewView extends React.Component {

    handleChangeType = (e, { value }) => {
        OverviewStore.chartType = value;
    }
    handleChangeData = (e, { value }) => {
        OverviewStore.dataType = value;
    }

    getChartData = (data) => {
        var tupleLabelAmount = {
            labels: [],
            amounts: []
        }
        data.map(elem => {
            if (!tupleLabelAmount.labels.includes(elem.description)) {
                tupleLabelAmount.labels.push(elem.description);
            }
        });

        tupleLabelAmount.labels.forEach(label => {
            const results = data.filter(elem => label === elem.description);
            var sum = results.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.amount;
            }, 0);
            tupleLabelAmount.amounts.push(sum);
        })
        return tupleLabelAmount;
    }

    getDataType = () => {
        switch (OverviewStore.dataType) {
            case 'incomes':
                return OverviewStore.getIncomes();
                break;
            case 'expenses':
                return OverviewStore.getExpenses();
                break;
            case 'inflow':
                return OverviewStore.getInflow();
                break;
            case 'outflow':
                return OverviewStore.getOutflow();
                break;
            default:
                return null
        }
    }

    handleAdd = () => {
        console.log("adding chart for: " + OverviewStore.dataType + " - " + OverviewStore.chartType);
        console.log("getting data type");

        var data = this.getDataType(OverviewStore.dataType);

        console.log("getting chart data");
        const chartData = this.getChartData(data);

        const chartTitle = OverviewStore.chartType + " chart for types of " + OverviewStore.dataType;
        let myChart = new Chart(this.refs.chart, {
            type: OverviewStore.chartType,
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: chartTitle,
                    data: chartData.amounts,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'
                    ],
                    borderWidth: 1
                }]
            },

            options: {
                responsive: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    render() {

        const chartOptions = ['pie', 'radar', 'line', 'bar'].map((option, index) => {
            return { key: index, value: option, text: option }
        });
        const dataOptions = ['incomes', 'expenses', 'inflow', 'outflow'].map((option, index) => {
            return { key: index, value: option, text: option }
        });

        return (
            <div>
                <Form>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <Select
                                placeholder='Select your data'
                                options={dataOptions}
                                onChange={this.handleChangeData}
                            />
                        </Form.Field>
                        <Form.Field>

                            <Select
                                placeholder='Select your chart'
                                options={chartOptions}
                                onChange={this.handleChangeType}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Button onClick={this.handleAdd}> Add </Button>
                        </Form.Field>

                    </Form.Group>
                </Form>
                <div>
                    <canvas ref="chart" id="chart" height={'500'} width={'500'}></canvas>
                </div>





            </div >
        );
    }
}
