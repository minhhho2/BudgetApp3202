import * as React from "react";
import { Button } from "semantic-ui-react";
import { Container, Header, Icon } from "semantic-ui-react";
import { Table, Sidebar, Segment, Menu, Image } from 'semantic-ui-react';
const { Link } = require("react-router-dom");
import { observer } from "mobx-react";
import Transaction from "../transaction/Transaction";

import TransactionComponent from "../../features/transaction/TransactionComponent";
import DashboardStore from "./DashboardStore";
import ApplicationContent from "../../features/applicationcontent/ApplicationContent";
import BudgetView from "../../features/budget/BudgetView";
@observer
export default class DashboardComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            view: "transaction"
        }
    }

    onClickBudget = () => { this.setState({view: "budget"})}
    onClickTransaction = () => {this.setState({view: "transaction"})}
    onClickAddTransaction = () => {this.setState({view: "addTransaction"})}

    updateTransactions = (transaction) => {
        DashboardStore.transactions.push(transaction);
        console.log("Current State: " + transaction.toString()); // + this.state.state);
    }

    renderApplicationContent = () => {
        if (this.state.view === "transaction") {
            return (
                <ApplicationContent
                    income={DashboardStore.getTransactionType("income")}
                    expense={DashboardStore.getTransactionType("expense")}
                />
            );
        } else if (this.state.view === "budget") {
            return (
                <BudgetView />
            );
        } else if (this.state.view === "addTransaction") {
            return (
                <TransactionComponent updateTransactions={this.updateTransactions} />
            );
        }
    }

    render() {
        return (
            <div>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation='push' width='thin' visible={DashboardStore.visible} icon='labeled' vertical inverted>
                        <Menu.Item name='Budget' onClick={this.onClickBudget}>
                            <Icon name='money' />
                            Budget
                        </Menu.Item>
                        <Menu.Item name='Compare'>
                            <Icon name='copy' />
                            Compare
                        </Menu.Item>
                        <Menu.Item name='Analyse'>
                            <Icon name='tasks' />
                            Analyse
                        </Menu.Item>
                        <Menu.Item name='Transaction' onClick={this.onClickTransaction}>
                            <Icon name='money' />
                            Transaction
                        </Menu.Item>
                        <Menu.Item name='AddTransaction' onClick={this.onClickAddTransaction}>
                            <Icon name='add' />
                            Add Transaction
                        </Menu.Item>
                        <Menu.Item name='Settings'>
                            <Icon name='setting' />
                            Settings
                        </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Segment basic>

                            <Header as='h3'>Application Content</Header>

                            {this.renderApplicationContent()}


                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div >
        )
    }
}