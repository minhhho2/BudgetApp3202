import * as React from "react";
import { Modal, Input, Header, Form, Button, Select } from "semantic-ui-react";
import { observer } from "mobx-react";
import BudgetStore from "./BudgetStore";
import transactionTypes from "./TransactionTypes";
import txTypes from "./TxTypes";
import TxStore from "./TxStore";

@observer
export default class TxModal extends React.Component {
    close = () => {
        BudgetStore.editTxModal = false;
        TxStore.clear();
    }

    save = () => {
        TxStore.create();
        this.close();
    }

    update = () => {
        TxStore.update();
        this.close();
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
    handleDescriptionChange = e => {
        TxStore.description = e.target.value;
    }

    handleDirChangeSelect = (e, data) => {
        TxStore.mult = data.value;
    }

    handleAmountChange = (e) => {
        TxStore.amount = e.target.value;
    }

    render() {
        const { id, amount, description } = TxStore;
        const button = id === undefined ?
            <Button type="button" onClick={this.save}> Save </Button> :
            <Button type="button" onClick={this.update}> Update </Button>;

        const descriptionInput = TxStore.isOther ?
            <Form.Field>
                <Input 
                    type="text" 
                    placeholder="Description" 
                    value={description}
                    onChange={this.handleDescriptionChange} />
            </Form.Field> :
            null;

        return (
            <Modal open={BudgetStore.editTxModal} onClose={this.close}>
                <Modal.Header>{id === undefined ?
                    "Create Transaction" :
                    "Update Transaction"
                }</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Field>
                                <Select
                                    placeholder="+/-"
                                    options={txTypes}
                                    onChange={this.handleDirChangeSelect}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    placeholder="amount"
                                    type="number"
                                    value={amount}
                                    onChange={this.handleAmountChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Select
                                    onChange={this.handleDescriptionChangeSelect}
                                    value={description}
                                    options={transactionTypes}
                                />
                            </Form.Field>

                            {descriptionInput}

                            {button}
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}