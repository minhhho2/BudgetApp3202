import * as React from "react";
import { Divider, Form, Label, Input, TextArea } from 'semantic-ui-react'
import { Select, Button, Checkbox, Icon } from 'semantic-ui-react'
import { observer } from "mobx-react";

import BudgetStore from "./BudgetStore";
import ApiService from "../../services/ApiService";

@observer
export default class BudgetComponent extends React.Component {

    onChangeName = (e) => { BudgetStore.name = e.target.value }

    save = (e) => {
        e.preventDefault();
        ApiService.put('/budget', {
            name: 'my budget',
            description: 'This is my main budget.',
            amount: 1000,
            frequency: 1,
            timeunit: 'monthly'
        })
            .then(console.log)
    }

    getBudgets = (e) => {
        e.preventDefault();
        ApiService.get('/budget')
            .then(console.log)
    }

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
                    <Input
                        placeholder="Budget name"
                        value={BudgetStore.name}
                        onChange={this.onChangeName}
                    />
                    <TextArea
                        placeholder="Description"
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

                <Button onClick={this.getBudgets}>Get</Button>
                <Button onClick={this.save}>Save</Button>
            </Form>
        );
    }
}