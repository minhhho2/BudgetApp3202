import * as React from "react";
const { Link } = require("react-router-dom");
import { observer } from "mobx-react";
import { Button, Container, Header, Icon, Modal, Select, Input } from 'semantic-ui-react'
import TransactionStore from "./TransactionStore";

const options = [
    {key: 1,  value: "income", text: "income"},
    {key: 2, value: "expense", text: "expense"}
];

@observer
export default class TransactionComponent extends React.Component {

    handleChangeType = (e) => {
        TransactionStore.type = e.target.value;
    }

    handleChangeAmount = (e) => {
        TransactionStore.amount = e.target.value;
    }

    handleChangeDate = (e) => {
        TransactionStore.date = e.target.value;
    }

    handleOpen() {
        TransactionStore.state = true;
    }
    handleClose() {
        TransactionStore.state = false;
    }

    handleAddTransaction() {
        console.log("Added Transaction - " + this.type + " - " + this.amount + " - " + this.date);
        TransactionStore.state = false;
    }

    render() {
        return (
            <Modal open={TransactionStore.state} trigger={<Button onClick={this.handleOpen}>Add Transaction</Button>} closeIcon>
                <Header icon='money' content='New Transaction' />
                <Modal.Content>
                    <Select placeholder='Select transaction type' 
                        options={options} 
                        value={TransactionStore.type}
                        onChange={this.handleChangeType}
                    />
                    <Input type="number" placeholder='amount' 
                        value={TransactionStore.amount}
                        onChange={this.handleChangeAmount}
                    />
                    <Input type="date" placeholder='date' 
                        value={TransactionStore.date}
                        onChange={this.handleChangeDate}
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick = {this.handleClose}>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button color='green' onClick = {this.handleAddTransaction}>
                        <Icon name='checkmark' /> Confirm
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

/* 


*/