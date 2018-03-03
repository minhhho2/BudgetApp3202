import * as React from "react";
import { observer } from "mobx-react";
// Components
import CounterComponent from "./features/counter/CounterComponent";
import LoginComponent from "./features/auth/LoginComponent";
// Stores
import UserStore from "./stores/UserStore";
import RegisterComponent from './features/auth/RegisterComponent';
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";

class NotFoundComponent extends React.Component {
    render() {
        return <p>404 Page not found</p>;
    }
}

@observer
export default class App extends React.Component {
    render() {
        const spinner = UserStore.isAuthenticating ?
        (
          <Dimmer active={true}>
            <Loader active={true} inline="centered">Loading</Loader>
          </Dimmer>
        ) :
        <div />;
        // if (!UserStore.user) {
        //     return (
        //         <BrowserRouter>
        //             <Switch>                        
        //                 <Route path="/register" component={RegisterComponent} />
        //                 <Route path="/budget" component={() => <p>Budgets!</p>} />
        //                 <Route component={LoginComponent} />
        //             </Switch>
        //         </BrowserRouter>
        //     );
        // }
        return (
            <div>
                {spinner}
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