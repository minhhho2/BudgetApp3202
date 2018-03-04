import * as React from "react";
import { Button } from "semantic-ui-react";
import { Container, Header, Icon } from "semantic-ui-react";
import { Sidebar, Segment, Menu, Image } from 'semantic-ui-react';
const { Link } = require("react-router-dom");
import { observer } from "mobx-react";


import TransactionComponent from "../../features/transaction/TransactionComponent";
import DashboardStore from "./DashboardStore";

@observer
export default class DashboardComponent extends React.Component {
    constructor(props) {
        super(props);

        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleMenuNewTransaction = this.handleMenuNewTransaction.bind(this);

    }

    handleItemClick() { console.log("print clikc"); }
    handleMenuNewTransaction() { }

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
                        <Menu.Item name='Transaction' onClick={this.handleMenuNewTransaction}>
                            <Icon name='add' />
                            <TransactionComponent />
                        </Menu.Item>
                        <Menu.Item name='Settings'>
                            <Icon name='setting' />
                            Settings
                        </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Segment basic>
                            <Header as='h3'>Application Content</Header>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}