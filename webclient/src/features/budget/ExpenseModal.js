import * as React from "react";
import { Modal, Input, Header, Form, Button, Select, Checkbox } from "semantic-ui-react";
import { observer } from "mobx-react";
import BudgetStore from "./BudgetStore";
import transactionTypes from "./TransactionTypes";
import ExpenseStore from "./ExpenseStore";

@observer
export default class ExpenseModal extends React.Component {
    handleClose = () => {
        BudgetStore.expenseModal = false;
    }

    submit = () => {
        ExpenseStore.create();
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
        const timeunits = [
            { key: 'Daily', value: 'Daily', text: 'Daily' },
            { key: 'Weekly', value: 'Weekly', text: 'Weekly' },
            { key: 'Monthly', value: 'Monthly', text: 'Monthly' },
            { key: 'Annually', value: 'Annually', text: 'Annually' },
        ];

        const descriptionInput = ExpenseStore.isOther ?
            <div>
                <Input type="text" placeholder="Description" />
                <br style={{ paddingBottom: "1em" }} />
            </div> :
            null;

        const endDateInput = ExpenseStore.hasEndDate ?
            <Input
                type="date"
                label="End date"
                onChange={this.handleEndDateChange}
            /> :
            null;

        return (
            <Modal open={BudgetStore.expenseModal} onClose={this.handleClose}>
                <Modal.Header>Add recuring expense</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form onSubmit={this.submit}>
                            <Input placeholder="name" onChange={this.handleNameChange} />
                            <br style={{ paddingBottom: "1em"}} />
                            <Input placeholder="amount" type="number" onChange={this.handleAmountChange} />
                            <Select options={timeunits} value={ExpenseStore.timeunit} onChange={this.handleTimeUnitChange} />
                            <Input placeholder="Frequency" type="number" onChange={this.handleFrequencyChange} />
                            <br style={{ paddingBottom: "1em" }} />
                            <Select
                                onChange={this.handleDescriptionChangeSelect}
                                placeholder="Type"
                                options={transactionTypes}
                            />
                            <br style={{ paddingBottom: "1em" }} />
                            {descriptionInput}
                            <br style={{ paddingBottom: "1em" }} />
                            <Checkbox onChange={this.handleHasEndDateChange} label="Has end date?" />
                            <br style={{ paddingBottom: "1em" }} />                            
                            {endDateInput}
                            <br style={{ paddingBottom: "1em" }} />

                            <Button type="submit" primary>
                                Save
                            </Button>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}