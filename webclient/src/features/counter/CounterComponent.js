import * as React from "react";
import CounterStore from "./CounterStore";
import { observer } from "mobx-react";
const { Link } = require("react-router-dom");
import UserStore from "../../stores/UserStore";
import { Button } from "semantic-ui-react";

@observer
export default class CounterComponent extends React.Component {
    componentDidMount() {
        CounterStore.getHelloMessage();
    }

    increment = () => {
        CounterStore.count++;
    }

    render() {
        return (
            <div>
                <h4>{CounterStore.message}</h4>
                <p>Count: {CounterStore.count}</p>
                <Button primary onClick={this.increment}>Increment</Button>
                <Button positive onClick={CounterStore.testAuthenticate}>Authenticate</Button>
                <Button negative as={Link} to="/test">notfound</Button>
            </div>
        );
    }
}