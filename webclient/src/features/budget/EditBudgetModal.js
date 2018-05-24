import * as React from "react";
import { observer } from "mobx-react";
import {
    Form, Input, TextArea, Select, Checkbox, Header, Button, Modal
} from "semantic-ui-react";
import EditBudgetStore from "./EditBudgetStore";
import BudgetStore from "./BudgetStore";


@observer
export default class EditBudgetModal extends React.Component {

    onChangeName = (e) => { EditBudgetStore.name = e.target.value; }
    onChangeDescription = (e) => { EditBudgetStore.description = e.target.value; }
    onChangeAmount = (e) => { EditBudgetStore.amount = e.target.value; }
    onChangeFrequency = (e) => { EditBudgetStore.frequency = e.target.value; }
    onChangeTimeUnit = (e) => { EditBudgetStore.timeunit = e.target.value; }
    onChangeEndDate = (e) => { EditBudgetStore.endDate = e.target.value; }
    onChangeOneOff = (e, { value }) => { EditBudgetStore.oneOff = !value | 0 }

    close = () => {
        BudgetStore.editBudgetModal = false;
        EditBudgetStore.reset();
    }

    save = () => {
        EditBudgetStore.create();
    }

    update = () => {
        EditBudgetStore.update();
    }



    render() {
        const freqOptions = [
            { text: 'day', value: '7' },
            { text: 'week', value: '14' },
            { text: 'month', value: '31' },
            { text: 'year', value: '365' }
        ];

        const { id, name, description, amount, oneOff } = EditBudgetStore;

        var button = id === undefined ?
            <Button onClick={this.save}> Save </Button> :
            <Button onClick={this.update}> Update </Button>;

        var frequencyComponent = oneOff ?
            <div /> :
            (
                <Form.Group widths='equal'>
                    <Form.Field>
                        <Input fluid type="number" label="frequency" />
                    </Form.Field>
                    <Form.Field>
                        <Select fluid placeholder="select time unit" options={freqOptions} />
                    </Form.Field>
                </Form.Group>
            )

        return (
            <Modal open={BudgetStore.editBudgetModal} onClose={this.close}>
                <Modal.Header>
                    {
                        id === undefined ?
                            "Create Budget" :
                            "Update Budget"
                    }
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
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
                                    value={EditBudgetStore.description}
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
                                    value={EditBudgetStore.endDate}
                                    onChange={this.onChangeEndDate}
                                    label="End date"
                                />
                            </Form.Field>

                        </Form>

                        {button}

                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}