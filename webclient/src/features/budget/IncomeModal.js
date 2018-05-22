import * as React from "react";
import { Modal, Input, Header, Form, Button, Select, Checkbox } from "semantic-ui-react";
import { observer } from "mobx-react";
import BudgetStore from "./BudgetStore";
import transactionTypes from "./TransactionTypes";
import IncomeStore from "./IncomeStore";

@observer
export default class incomeModal extends React.Component {
    handleClose = () => {
        BudgetStore.incomeModal = false;
    }

    submit = () => {
        IncomeStore.create();
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
        const timeunits = [
            { key: 'Daily', value: 'Daily', text: 'Daily' },
            { key: 'Weekly', value: 'Weekly', text: 'Weekly' },
            { key: 'Monthly', value: 'Monthly', text: 'Monthly' },
            { key: 'Annually', value: 'Annually', text: 'Annually' },
        ];

        const descriptionInput = IncomeStore.isOther ?
            <div>
                <Input type="text" placeholder="Description" />
                <br style={{ paddingBottom: "1em" }} />
            </div> :
            null;

        const endDateInput = IncomeStore.hasEndDate ?
            <Input
                type="date"
                label="End date"
                onChange={this.handleEndDateChange}
            /> :
            null;

        return (
            <Modal open={BudgetStore.incomeModal} onClose={this.handleClose}>
                <Modal.Header>Add recuring income</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form onSubmit={this.submit}>
                            <Input placeholder="name" onChange={this.handleNameChange} />
                            <br style={{ paddingBottom: "1em"}} />
                            <Input placeholder="amount" type="number" onChange={this.handleAmountChange} />
                            <Select options={timeunits} value={IncomeStore.timeunit} onChange={this.handleTimeUnitChange} />
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