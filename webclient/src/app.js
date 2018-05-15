import * as React from "react";
import { observer } from "mobx-react";

// Components
import CounterComponent from "./features/counter/CounterComponent";
import LoginComponent from "./features/auth/LoginComponent";
import DashboardComponent from "./features/dashboard/DashboardComponent";

// Stores
import UserStore from "./stores/UserStore";
import RegisterComponent from "./features/auth/RegisterComponent";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { Dimmer, Loader, Button, Sidebar, Menu, Segment } from "semantic-ui-react";
import { Header, Icon, Image } from "semantic-ui-react"
import DashboardStore from "./features/dashboard/DashboardStore";
import ApiService from "./services/ApiService";
import EditBudgetComponent from "./features/budget/EditBudgetComponent";

// Views
import BudgetView from "./features/budget/BudgetView";
import SettingView from "./features/setting/SettingView";

class NotFoundComponent extends React.Component {
    render() {
        return <p>404 Page not found</p>;
    }
}

@observer
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    componentDidMount() {
        ApiService.get("/auth")
            .then(JSON.parse)
            .then(res => {
                if (res.Success)
                    UserStore.setUser(res.Message);
            });
    }

    toggleVisibility = () => {
        DashboardStore.visible = !DashboardStore.visible;
    }

    logout = () => {
        fetch("http://localhost:4100/auth", {
            method: "POST",
            credentials: "include"
        }).then(_ => UserStore.user = undefined);
    }

    updateTransactions = (transaction) => {
        DashboardStore.transactions.push(transaction);
        console.log("Current State: " + transaction.toString()); // + this.state.state);
    }

    render() {
        const spinner = UserStore.isAuthenticating ?
            (
                <Dimmer active={true}>
                    <Loader active={true} inline="centered">Loading</Loader>
                </Dimmer>
            ) :
            <div />;
        if (!UserStore.user) {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route path="/register" component={RegisterComponent} />
                        <Route path="/budget" component={() => <p>Budgets!</p>} />
                        <Route component={LoginComponent} />
                    </Switch>
                </BrowserRouter>
            );
        }
        return (
            <div>
                {spinner}
                <div>
                    <Header as="h2" icon textAlign="center">
                        <Icon name="dashboard" onClick={this.toggleVisibility} size="massive" />
                        <Header.Content>
                            <span style={{ letterSpacing: "3px" }}>
                                Cloudstacks
                            </span>
                        </Header.Content>
                    </Header>
                    <Button onClick={this.logout}>Logout</Button>
                </div>
                <BrowserRouter>
                    <Sidebar.Pushable as={Segment}>
                        <Sidebar as={Menu} animation="push" width="thin" visible={true} icon="labeled" vertical inverted>
                            <Menu.Item as={Link} to="/budget" name="Budget">
                                <Icon name="money" />
                                Budget
                        </Menu.Item>
                            <Menu.Item name="Compare">
                                <Icon name="copy" />
                                Compare
                        </Menu.Item>
                            <Menu.Item name="Analyse">
                                <Icon name="tasks" />
                                Analyse
                        </Menu.Item>

                            <Menu.Item as={Link} to="/setting" name="Setting">
                                <Icon name="setting" />
                                Setting
                            </Menu.Item>
                            <Menu.Item name="Logout">
                                <Icon name="log out" />
                                Logout
                        </Menu.Item>
                        </Sidebar>
                        <Sidebar.Pusher>
                            <Segment basic>
                                <Switch>
                                    <Route path="/" exact component={DashboardComponent} />
                                    <Route path="/budget" exact component={BudgetView} />
                                    <Route path="/budget/create" exact component={EditBudgetComponent} />
                                    <Route path="/budget/edit/:id" exact component={EditBudgetComponent} />

                                    <Route path="/setting" exact component={SettingView} />
                                    <Route component={NotFoundComponent} />
                                </Switch>
                            </Segment>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </BrowserRouter>

            </div>
        );
    }
}