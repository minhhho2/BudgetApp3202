import * as React from "react";
import { Button, Dropdown, Form, Select } from 'semantic-ui-react'
import { observer } from "mobx-react";

import chartOptions from "./ChartOptions"
import dataOptions from "./dataOptions"
import chartVariables from "./ChartVariables"



import OverviewStore from "./OverviewStore";
import Chart from 'chart.js';

@observer
export default class OverviewView extends React.Component {
    componentWillUnmount() {
        OverviewStore.hasChart = false;
    }

    handleChangeType = (e, { value }) => {
        OverviewStore.chartType = value;
    }
    handleChangeData = (e, { value }) => {
        OverviewStore.dataType = value;
    }

    getChartData = (data) => {
        var dict = {
            labels: [],
            amounts: []
        }

        data.map(elem => {
            if (!dict.labels.includes(elem.description)) {
                dict.labels.push(elem.description);
            }
        });

        dict.labels.forEach(label => {
            const results = data.filter(elem => label === elem.description);
            var sum = results.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.amount;
            }, 0);
            dict.amounts.push(sum);
        })

        return dict;
    }

    updateDataType = (dataType) => {
        switch (dataType) {
            case 'incomes':
                return OverviewStore.getIncomes();
            case 'expenses':
                return OverviewStore.getExpenses();
            case 'inflow':
                return OverviewStore.getInflow();
            case 'outflow':
                return OverviewStore.getOutflow();
            default:
                return null;
        }
    }

    handleAdd = () => {
        this.updateDataType(OverviewStore.dataType)
        .then(() => {
            const chartData = this.getChartData(OverviewStore.data); // tuple

            if (OverviewStore.hasChart) {
                OverviewStore.chart.destroy();
            }
            OverviewStore.chart = new Chart(this.refs.chart, {
                type: OverviewStore.chartType,
                data: {
                    labels: chartData.labels,
                    datasets: [{
                        label: "Standardised " + OverviewStore.dataType,  // title
                        data: chartData.amounts,
                        backgroundColor: chartVariables.backgroundColor,
                        borderColor: chartVariables.borderColor,
                        borderWidth: 1
                    }]
                },
                options: chartVariables.options
            });
            OverviewStore.hasChart = true;
        });
    }

    render() {
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

                <canvas ref="chart" id="chart" height={'500'} width={'500'} />

            </div>
        );
    }
}
