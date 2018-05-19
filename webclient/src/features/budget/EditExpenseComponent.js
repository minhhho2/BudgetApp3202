import * as React from "react";
import { observer } from "mobx-react";
import {
    Form, Input, TextArea, Select, Checkbox, Header, Button
} from "semantic-ui-react";
import EditExpenseStore from "./EditExpenseStore";
import BudgetStore from "./BudgetStore";


@observer
export default class EditExpenseComponent extends React.Component {
    constructor(props) {
        super(props);
        const id = parseInt(props.match.params.id, 10);


    }
    onChangeName = (e) => { EditBudgetStore.name = e.target.value; }

    render() {


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
                            value={EditBudgetStore.name}
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
                            value={EditBudgetStore.amount}
                            onChange={this.onChangeAmount}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox
                            toggle
                            label="One off"
                            value={EditBudgetStore.oneOff}
                            checked={EditBudgetStore.oneOff === 1}
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
                <Button onClick={BudgetStore.save}> Save </Button>
            </div>
        );
    }
}