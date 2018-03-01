import * as React from 'react'
import CounterComponent from "./features/counter/CounterComponent";
const { BrowserRouter, Link, Route, Switch, Redirect } = require("react-router-dom");

class NotFoundComponent extends React.Component {
    render() {
        return <p>404 Page not found</p>;
    }
}

class BudgetComponent extends React.Component {
    render() {
        return <p>Budgets</p>;
    }
}

export default class App extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={CounterComponent} />
                        <Route path="/budget" exact component={BudgetComponent} />
                        <Route component={NotFoundComponent} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}