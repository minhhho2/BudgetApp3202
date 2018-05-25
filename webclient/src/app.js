import * as React from "react";
import { observer } from "mobx-react";

// Components
//import CounterComponent from "./features/counter/CounterComponent";
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
import BudgetView from "./features/budget/BudgetView";
import AnalyticsComponent from "./features/analytics";
import ProfileComponent from "./features/profile";
import SettingView from "./features/setting/SettingView";
import OverviewView from "./features/overview/OverviewView";

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
        ApiService.post("/auth")
            .then(_ => UserStore.user = undefined)
            .catch(_ => UserStore.user = undefined);
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
                            Cloudstacks
                        </Header.Content>
                    </Header>
                </div>
                <BrowserRouter>
                    <Sidebar.Pushable as={Segment}>
                        <Sidebar as={Menu} animation="push" width="thin" visible={true} icon="labeled" vertical inverted>
                            <Menu.Item as={Link} to="/budget" name="Budget">
                                <Icon name="money" />
                                Personal finance
                        </Menu.Item>
                            <Menu.Item name="Profile" as={Link} to="/profile">
                                <Icon name="user" />
                                Profile
                        </Menu.Item>
                            <Menu.Item as={Link} to="/overview" name="Overview">
                                <Icon name="tasks" />
                                Analyse
                        </Menu.Item>
                            <Menu.Item name="Analyse" as={Link} to="/analytics">
                                <Icon name="tasks" />
                                Compare
                        </Menu.Item>
                            <Menu.Item as={Link} to="/setting" name="Setting">
                                <Icon name="setting" />
                                Settings
                        </Menu.Item>
                            <Menu.Item name="Logout" onClick={this.logout}>
                                <Icon name="log out" />
                                Logout
                        </Menu.Item>
                        </Sidebar>
                        <Sidebar.Pusher>
                            <Segment basic>
                                <div style={{ width: "80%" }}>
                                    <Switch>
                                        <Route path="/" exact component={DashboardComponent} />
                                        <Route path="/budget" exact component={BudgetView} />
                                        <Route path="/analytics" exact component={AnalyticsComponent} />
                                        <Route path="/profile" exact component={ProfileComponent} />
                                        <Route path="/setting" exact component={SettingView} />
                                        <Route path="/overview" exact component={OverviewView} />
                                        <Route component={NotFoundComponent} />
                                    </Switch>
                                </div>
                            </Segment>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </BrowserRouter>
            </div>
        );
    }
}