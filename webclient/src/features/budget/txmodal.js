import * as React from "react";
import { Modal, Input, Header, Form, Button } from "semantic-ui-react";
import { observer } from "mobx-react";
import BudgetStore from "./BudgetStore";

@observer
export default class TxModal extends React.Component {
    handleClose = () => {
        BudgetStore.txModal = false;
    }

    submit = () => {
        alert("saved");
        this.handleClose();
    }

    render() {
        return (
            <Modal open={BudgetStore.txModal} onClose={this.handleClose}>
                <Modal.Header>Add transaction</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form onSubmit={this.submit}>
                            <Input placeholder="amount" type="number" />
                            <br style={{ paddingBottom: "1em" }} />
                            <Input placeholder="description" />
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