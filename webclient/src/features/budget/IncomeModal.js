import * as React from "react";
import { Modal, Input, Header, Form, Button, Select, Checkbox } from "semantic-ui-react";
import { observer } from "mobx-react";
import BudgetStore from "./BudgetStore";
import transactionTypes from "./TransactionTypes";
import IncomeStore from "./IncomeStore";

@observer
export default class incomeModal extends React.Component {

    close = () => {
        BudgetStore.editIncomeModal = false;
    }

    save = () => {
        IncomeStore.create();
        this.close();
    }

    update = () => {
        IncomeStore.update();
        this.close();
    }

    handleDescriptionChangeSelect = (e, data) => {
        if (data.value === "other") {
            IncomeStore.description = "";
            IncomeStore.isOther = true;
            return;
        }

        IncomeStore.description = data.value;
        IncomeStore.isOther = false;
    }

    handleTimeUnitChange = (e, data) => {
        IncomeStore.timeunit = data.value
    }

    handleAmountChange = (e) => {
        IncomeStore.amount = e.target.value;
    }

    handleFrequencyChange = (e) => {
        IncomeStore.frequency = e.target.value;
    }

    handleHasEndDateChange = () => {
        IncomeStore.hasEndDate = !IncomeStore.hasEndDate;
    }

    handleEndDateChange = (e) => {
        IncomeStore.endDate = e.target.value;
    }

    handleNameChange = (e) => {
        IncomeStore.name = e.target.value;
    }

    render() {
        const { id, name, amount, description, timeunit, frequency, endDate } = IncomeStore;
        const button = id === undefined ?
            <Button type="button" onClick={this.save}> Save </Button> :
            <Button type="button" onClick={this.update}> Update </Button>;

        const timeunits = [
            { key: 'Daily', value: 'Daily', text: 'Daily' },
            { key: 'Weekly', value: 'Weekly', text: 'Weekly' },
            { key: 'Monthly', value: 'Monthly', text: 'Monthly' },
            { key: 'Annually', value: 'Annually', text: 'Annually' },
        ];

        return (
            <Modal open={BudgetStore.editIncomeModal} onClose={this.close}>
                <Modal.Header>Add recuring income</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Field>
                                <Input
                                    placeholder="name"
                                    label="name"
                                    value={name}
                                    onChange={this.handleNameChange}
                                />
                            </Form.Field>

                            <Form.Field>
                                <Input
                                    placeholder="amount"
                                    label="amount"
                                    value={amount}
                                    type="number"
                                    onChange={this.handleAmountChange} />
                            </Form.Field>
                            <Form.Field>
                                <Select
                                    options={timeunits}
                                    value={timeunit}
                                    onChange={this.handleTimeUnitChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    placeholder="Frequency"
                                    label="frequency"
                                    type="number"
                                    value={frequency}
                                    onChange={this.handleFrequencyChange}
                                />
                            </Form.Field>

                            <Form.Field>
                                <Input
                                    label="Description"
                                    onChange={this.handleDescriptionChangeSelect}
                                    placeholder="Type"
                                    type="text"
                                    value={description}
                                />
                            </Form.Field>

                            <Form.Field>
                                <Input
                                    type="date"
                                    label="end date"
                                    onChange={this.handleEndDateChange}
                                    value={endDate}
                                />
                            </Form.Field>

                            {button}

                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}