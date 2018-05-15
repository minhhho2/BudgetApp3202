import * as React from "react";
import { observer } from "mobx-react";
import {
    Form, Input, TextArea, Select, Checkbox, Header
} from "semantic-ui-react";
import EditBudgetStore from "./EditBudgetStore";

@observer
export default class EditBudgetComponent extends React.Component {
    constructor(props) {
        super(props);
        const id = parseInt(props.match.params.id, 10);

        // TODO: breaking shit here
        /*if (isNaN(id)) {
            return;
        }*/

        EditBudgetStore.getData(id);
    }
    onChangeName = (e) => { EditBudgetStore.name = e.target.value; }
    onChangeDescription = (e) => { EditBudgetStore.description = e.target.value; }
    onChangeAmount = (e) => { EditBudgetStore.amount = e.target.value; }
    onChangeFrequency = (e) => { EditBudgetStore.frequency = e.target.value; }
    onChangeTimeUnit = (e) => { EditBudgetStore.timeunit = e.target.value; }
    onChangeEndDate= (e) => { EditBudgetStore.endDate = e.target.value; }
    onChangeOneOff = (e, {value}) => { EditBudgetStore.oneOff = !value } // Doesnt work properly

    render() {
        const freqOptions = [
            { text: 'day', value: '7' },
            { text: 'week', value: '14' },
            { text: 'month', value: '31' },
            { text: 'year', value: '365' }
        ];

        // TODO: breaking shit here
        const { name, description, amount, oneOff} = EditBudgetStore;

        var frequencyComponent =  EditBudgetStore.oneOff ?
            <div /> :
            (
                <Form.Group widths='equal'>
                    <Form.Field>
                        <Input fluid type="number" label="frequency"/>
                    </Form.Field>
                    <Form.Field>
                        <Select fluid placeholder="select time unit" options={freqOptions} />
                    </Form.Field>
                </Form.Group>
            )
            
        return (
            <div>
                <Header as="h3">
                    <Header.Content>Create budget</Header.Content>
                </Header>
                <Form>
                    <Form.Field>
                        <Input
                            placeholder="Budget name"
                            label="Name"
                            value={name}
                            onChange={this.onChangeName}
                        />
                    </Form.Field>
                    <Form.Field>
                        <TextArea
                            placeholder="Description"
                            label="Description"
                            onChange={this.onChangeDescription}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            placeholder="amount"
                            label="Amount"
                            type="number"
                            value={amount}
                            onChange={this.onChangeAmount}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox
                            toggle
                            label="One off?"
                            value={EditBudgetStore.oneOff}
                            checked={EditBudgetStore.oneOff === true}
                            onChange={this.onChangeOneOff}
                        />
                    </Form.Field>
                    {frequencyComponent}
                    <Form.Field>
                        <Input
                            type="date"
                            label="End date"
                        />
                    </Form.Field>

                </Form>
            </div>
        );
    }
}