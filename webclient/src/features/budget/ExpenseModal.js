import * as React from "react";
import { Modal, Input, Header, Form, Button, Select, Checkbox } from "semantic-ui-react";
import { observer } from "mobx-react";
import BudgetStore from "./BudgetStore";
import transactionTypes from "./TransactionTypes";
import ExpenseStore from "./ExpenseStore";
import timeUnits from "./TimeUnits";

@observer
export default class ExpenseModal extends React.Component {

    close = () => {
        BudgetStore.editExpenseModal = false;
        ExpenseStore.clear();
    }

    save = () => {
        ExpenseStore.create();
        this.close();
    }

    update = () => {
        ExpenseStore.update();
        this.close();
    }

    handleDescriptionChangeSelect = (e, data) => {
        if (data.value === "other") {
            ExpenseStore.description = "";
            ExpenseStore.isOther = true;
            return;
        }
        ExpenseStore.description = data.value;
        ExpenseStore.isOther = false;
    }

    handleDescriptionChange = e => {
        ExpenseStore.description = e.target.value;
    }

    handleTimeUnitChange = (e, data) => {
        ExpenseStore.timeunit = data.value
    }

    handleAmountChange = (e) => {
        ExpenseStore.amount = e.target.value;
    }

    handleFrequencyChange = (e) => {
        ExpenseStore.frequency = e.target.value;
    }

    handleHasEndDateChange = () => {
        ExpenseStore.hasEndDate = !ExpenseStore.hasEndDate;
    }

    handleEndDateChange = (e) => {
        ExpenseStore.endDate = e.target.value;
    }

    handleNameChange = (e) => {
        ExpenseStore.name = e.target.value;
    }

    render() {
        const { id, name, amount, description, timeunit, frequency, endDate } = ExpenseStore;

        const button = id === undefined ?
            <Button type="button" onClick={this.save}> Save </Button> :
            <Button type="button" onClick={this.update}> Update </Button>;

        const descriptionInput = ExpenseStore.isOther ?
            <Form.Field>
                <Input
                    type="text"
                    placeholder="Description"
                    onChange={this.handleDescriptionChange}
                />
            </Form.Field> :
            null;

        return (
            <Modal open={BudgetStore.editExpenseModal} onClose={this.close}>
                <Modal.Header>
                    {
                        id === undefined ?
                            "Create Recurring Expense" :
                            "Update Recurring Expense"
                    }
                </Modal.Header>
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
                                    options={timeUnits}
                                    value={timeunit}
                                    onChange={this.handleTimeUnitChange} />
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
                                <Select
                                    onChange={this.handleDescriptionChangeSelect}
                                    placeholder="Type"
                                    value={description}
                                    options={transactionTypes}
                                />
                            </Form.Field>

                            {descriptionInput}

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