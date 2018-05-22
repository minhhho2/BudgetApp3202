import * as React from "react";
import { observer } from "mobx-react";
import { Icon, Form } from "semantic-ui-react";
import AnalyticsStore from "./AnalyticsStore";

export default class AnalyticsComponent extends React.Component {

    handleChangeAge = (e) => {  
        AnalyticsStore.age = parseInt(e.target.value);
        console.log(AnalyticsStore.age);
    }
    handleChangeType = (e, { value }) => {
        AnalyticsStore.type = value;
        console.log(AnalyticsStore.type);
    }

    render() {
        const options = [
            { key: 0, text: 'incomes', value: 'incomes' },
            { key: 1, text: 'expenses', value: 'expenses' }
        ];

        return (
            <div>
                <Form>
                    <Form.Group widths="equal">
                        <Form.Input inline
                            label="Age"
                            type="number"
                            min='0' max='200'
                            placeholder='age'
                            value={AnalyticsStore.age}
                            onChange={this.handleChangeAge}
                        />
                        <Form.Select inline
                            label="Type"
                            options={options}
                            placeholder='Type'
                            value={AnalyticsStore.type}
                            onChange={this.handleChangeType}
                        />
                    </Form.Group>
                </Form>




                <h1>
                    <Icon name="line chart" />
                    Compare and analyse your finances!
                </h1>

                <h3> Compare </h3>
                <ul>
                    <li>
                        Compare income
                        <ul>
                            <li>By age</li>
                            <li>By type</li>
                        </ul>
                    </li>
                    <li>
                        Compare expenses
                        <ul>
                            <li>By age</li>
                            <li>By type</li>
                        </ul>
                    </li>
                    <li>
                        Compare your delta
                        <ul>
                            <li>By age</li>
                        </ul>
                    </li>
                </ul>

                <h3> Self </h3>
                <ul>
                    <li>Income distribution</li>
                    <li>Expense distribution</li>
                    <li>Transaction distribution</li>
                </ul>
            </div>
        )
    }
}