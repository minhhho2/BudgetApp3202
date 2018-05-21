import * as React from "react";
import { Modal, Input, Header, Form, Button, Select } from "semantic-ui-react";
import { observer } from "mobx-react";
import BudgetStore from "./BudgetStore";
import transactionTypes from "./TransactionTypes";
import TxStore from "./TxStore";

@observer
export default class TxModal extends React.Component {
    handleClose = () => {
        BudgetStore.txModal = false;
    }

    submit = () => {
        alert("saved");
        this.handleClose();
    }

    handleDescriptionChangeSelect = (e, data) => {
        if (data.value === "other") {
            TxStore.description = "";
            TxStore.isOther = true;
            return;
        }
        TxStore.description = data.value;
        TxStore.isOther = false;
    }

    handleDirChangeSelect = (e, data) => {
        TxStore.mult = data.value; // 1 or -1 as a multiplier for Made/Spent
    }

    render() {
        const txTypes = [
            { key: 'made', value: 1, text: 'Made' },
            { key: 'spent', value: -1, text: 'Spent' }
        ];

        const descriptionInput = TxStore.isOther ?
            <div>
                <Input type="text" placeholder="Description" />
                <br style={{ paddingBottom: "1em" }} />
            </div> :
            null;

        return (
            <Modal open={BudgetStore.txModal} onClose={this.handleClose}>
                <Modal.Header>Add transaction</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form onSubmit={this.submit}>
                            <Select
                                placeholder="Made/Spent"
                                options={txTypes}
                                onChange={this.handleDirChangeSelect}
                            />
                            <br style={{ paddingBottom: "1em" }} />
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