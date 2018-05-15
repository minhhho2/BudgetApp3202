import * as React from "react";
const { Link } = require("react-router-dom");
import { observer } from "mobx-react";
import { Button, Container, Header, Icon, Modal, Select, Input } from 'semantic-ui-react'
import BudgetStore from "./BudgetStore";
import Budget from "./Budget"

@observer
export default class BudgetComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() { this.open() }

    handleChangeCategory = (e) => {BudgetStore.category = e.target.value; }
    handleChangeFrequency = (e) => {BudgetStore.frequency = e.target.value; }
    handleChangeGoal = (e) => {BudgetStore.goal = e.target.value; }
    
    handleAddBudget = () => {
        var size = BudgetStore.budgets.length;
        var newBudget = new Budget(size + 1, "fuel", "daily", BudgetStore.goal);
        this.props.updateBudgets(newBudget);
        BudgetStore.isOpen = false;
    }

    close = () => { BudgetStore.isOpen = false; }
    open = () => {BudgetStore.isOpen = true; }

    render() {

        const categories = [
            {key: 1,  value: "fuel", text: "fuel"},
            {key: 2, value: "social", text: "social"}
        ];

        const frequencies = [
            {key: 1,  value: "daily", text: "daily"},
            {key: 2, value: "weekly", text: "weekly"}
        ];

        return (
            <Modal onClose={this.close} open={BudgetStore.isOpen}>

                <Modal.Content>
                    <Select placeholder='Select category' 
                        options={categories} 
                        value={BudgetStore.categories}
                        onChange={(e) => this.handleChangeCategory(e)}
                    />

                    <Select placeholder='Select frequency' 
                        options={frequencies} 
                        value={BudgetStore.frequency}
                        onChange={(e) => this.handleChangeFrequency(e)}
                    />
                    <Input type="number" placeholder='goal' 
                        value={BudgetStore.goal}
                        onChange={(e) => this.handleChangeGoal(e)}
                    />
                </Modal.Content>

                <Modal.Actions>
                    <Button color='red' onClick={this.close}>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button color='green' onClick={this.handleAddBudget}>
                        <Icon name='checkmark' /> Confirm
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

/* 


*/