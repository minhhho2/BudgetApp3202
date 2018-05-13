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
        
        if (isNaN(id)) {
            return;
        }

        EditBudgetStore.getData(id);
    }
    render() {
        const freqOptions = [
            { text: 'daily', value: 'daily' },
            { text: 'weekly', value: 'weekly' },
            { text: 'monthly', value: 'monthly' },
            { text: 'yearly', value: 'yearly' }
        ];

        const { name, description, amount, oneOff } = EditBudgetStore;

        const frequencyComponent = oneOff ?
            <div /> :
            (
                <div style={{ display: "inline" }}>
                    <Input type="number" label="frequency" />
                    <Input label="timeunit" />
                </div>
            )

        return (
            <div>
                <Header as="h3">
                    <Header.Content>Create budget</Header.Content>
                </Header>
                <Form.Field>
                    <Input
                        placeholder="Budget name"
                        label="Name"
                        value={name}
                        onChange={this.onChangeName}
                    />
                    <br />
                    <TextArea
                        placeholder="Description"
                        label="Description"
                    />
                    <br />
                    <Input
                        placeholder="amount"
                        label="Amount"
                        type="number"
                        value={amount}
                        onChange={this.onChangeAmount}
                    />
                    <br />
                    <Checkbox
                        toggle
                        label="One off?"
                        checked={oneOff}
                        onChange={this.oneOffHandler}
                    />
                    <br />
                    {frequencyComponent}
                    <Input
                        type="date"
                        label="End date"
                    />
                    <br />
                </Form.Field>
            </div>
        );
    }
}