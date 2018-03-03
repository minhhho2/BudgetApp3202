import * as React from "react";
const { Link } = require("react-router-dom");
import { Button, Container, Header, Icon, Modal, Select, Input } from 'semantic-ui-react'
import TransactionStore from "./TransactionStore";

const options = [
    {key: 1,  value: "income", text: "income"},
    {key: 2, value: "expense", text: "expense"}
];

export default class TransactionComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Modal trigger={<Button>Add Transaction</Button>} closeIcon>
                <Header icon='money' content='New Transaction' />
                <Modal.Content>
                    <Select placeholder='Select transaction type' 
                        options={options} 
                        value={TransactionStore.type}/>
                    <Input type="number" placeholder='amount' 
                        value={TransactionStore.amount}/>
                    <Input type="date" placeholder='date' 
                        value={TransactionStore.date}/>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red'>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button color='green'>
                        <Icon name='checkmark' /> Confirm
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

/* 


*/