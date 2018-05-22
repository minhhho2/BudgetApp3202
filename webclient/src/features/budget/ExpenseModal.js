import * as React from "react";
import { Modal, Input, Header, Form, Button, Select } from "semantic-ui-react";
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
        ExpenseStore.save();
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

    render() {
        const descriptionInput = ExpenseStore.isOther ?
            <div>
                <Input type="text" placeholder="Description" />
                <br style={{ paddingBottom: "1em" }} />
            </div> :
            null;

        return (
            <Modal open={BudgetStore.expenseModal} onClose={this.handleClose}>
                <Modal.Header>Add transaction</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form onSubmit={this.submit}>
                            <Input placeholder="amount" type="number" />
                            <br style={{ paddingBottom: "1em" }} />
                            <Select
                                onChange={this.handleDescriptionChangeSelect}
                                placeholder="Description"
                                options={transactionTypes}
                            />
                            <br style={{ paddingBottom: "1em" }} />
                            {descriptionInput}
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