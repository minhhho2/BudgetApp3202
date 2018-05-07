import * as React from "react";
import { Divider, Form, Label } from 'semantic-ui-react'
import { Select, Button, Checkbox, Icon } from 'semantic-ui-react'
import { observer } from "mobx-react";

import BudgetStore from "./BudgetStore";

@observer
export default class BudgetComponent extends React.Component {

    onChangeName = (e) => { BudgetStore.name = e.target.value }
    render() {

        const freqOptions = [
            { text: 'daily', value: 'daily' },
            { text: 'weekly', value: 'weekly' },
            { text: 'monthly', value: 'monthly' },
            { text: 'yearly', value: 'yearly' }
        ];

        return (
            <Form>
                <Form.Field>
                    <label>Budget Name</label>
                    <input
                        placeholder={'Budget Name'}
                        value={BudgetStore.name}
                        onChange={this.onChangeName}
                    />
                </Form.Field>

                <div>
                    <h2> Income </h2>
                    {BudgetStore.incomes.map((incRow, index) => {
                        return (
                            <Form.Group widths='equal' key={index}>
                                <Form.Input
                                    value={incRow.Description}
                                    fluid label='Category'
                                    placeholder='Category'
                                />
                                <Form.Field
                                    control={Select} label='Frequency'
                                    options={freqOptions} placeholder='Frequency'
                                />
                            </Form.Group>
                        );
                    })}
                    <Icon name="add" onClick={() => BudgetStore.addRow()} />
                </div>

                <div>
                    <h2> Expense </h2>
                    <Form.Group widths='equal'>
                        <Form.Input
                            fluid label='Category'
                            placeholder='Category' />
                    </Form.Group>
                    <Icon name="add" />
                </div>

            </Form>
        );
    }
}