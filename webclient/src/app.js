import * as React from 'react'
// Components
import CounterComponent from "./features/counter/CounterComponent";
import LoginComponent from "./features/auth/LoginComponent";
// Stores
import UserStore from "./stores/UserStore";
const { BrowserRouter, Link, Route, Switch } = require("react-router-dom");

class NotFoundComponent extends React.Component {
    render() {
        return <p>404 Page not found</p>;
    }
}

export default class App extends React.Component {
    render() {
        if (!UserStore.user) {
            return (
                <BrowserRouter>
                    <Switch>                        
                        <Route component={LoginComponent} />
                    </Switch>
                </BrowserRouter>
            );
        }
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={CounterComponent} />
                        <Route component={NotFoundComponent} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}