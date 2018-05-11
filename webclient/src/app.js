import * as React from "react";
import { observer } from "mobx-react";

// Components
import CounterComponent from "./features/counter/CounterComponent";
import LoginComponent from "./features/auth/LoginComponent";
import DashboardComponent from "./features/dashboard/DashboardComponent";

// Stores
import UserStore from "./stores/UserStore";
import RegisterComponent from './features/auth/RegisterComponent';
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { Dimmer, Loader, Button } from "semantic-ui-react";
import { Header, Icon, Image } from 'semantic-ui-react'
import DashboardStore from "./features/dashboard/DashboardStore";
import ApiService from "./services/ApiService";

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
        ApiService.get('/auth')
            .then(JSON.parse)
            .then(r => {
                if (!r.Success) {
                    return;
                }
                UserStore.setUser(r.Message);
            });
    }

    toggleVisibility = () => {
        DashboardStore.visible = !DashboardStore.visible;
    }

    logout = () => {
        fetch('http://localhost:4100/auth', {
            method: 'POST',
            credentials: 'include'
        }).then(_ => UserStore.user = undefined);
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
                    <Header as='h2' icon textAlign='center'>
                        <Icon name='dashboard' onClick={this.toggleVisibility} size='massive' />
                        <Header.Content>
                            Financial Freedom
                        </Header.Content>
                    </Header>
                    <Button onClick={this.logout}>Logout</Button>
                </div>


                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={DashboardComponent} />
                        <Route component={NotFoundComponent} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}