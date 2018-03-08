import * as React from "react";
import { Button } from "semantic-ui-react";
import { Container, Header, Icon } from "semantic-ui-react";
import { Sidebar, Segment, Menu, Image } from 'semantic-ui-react';
const { Link } = require("react-router-dom");
import { observer } from "mobx-react";
import Transaction from "../transaction/Transaction";

import TransactionComponent from "../../features/transaction/TransactionComponent";
import DashboardStore from "./DashboardStore";
import ApplicationContent from "../../features/applicationcontent/ApplicationContent";

@observer
export default class DashboardComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            state: 0
        }
    }


    updateTransactions = (transaction) => {
        DashboardStore.transactions.push(transaction);

        console.log("Current State: " + transaction.toString()); // + this.state.state);
    }

    handleItemClick = () => { 
        console.log("print click from dashboard_component"); 
    }

    render() {
        return (
            <div>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation='push' width='thin' visible={DashboardStore.visible} icon='labeled' vertical inverted>
                        <Menu.Item name='Budget' onClick={this.handleItemClick}>
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
                        <Menu.Item name='Transaction' >
                            <Icon name='add' />
                            <TransactionComponent updateTransactions={this.updateTransactions} />
                        </Menu.Item>
                        <Menu.Item name='Settings'>
                            <Icon name='setting' />
                            Settings
                        </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Segment basic>

                            <Header as='h3'>Raw Transaction Summary</Header>

                            <ApplicationContent
                                income={DashboardStore.getTransactionType("income")}
                                expense={DashboardStore.getTransactionType("expense")}
                            />

                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}