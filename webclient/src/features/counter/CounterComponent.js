import * as React from "react";
import CounterStore from "./CounterStore";
import { observer } from "mobx-react";
const { Link } = require("react-router-dom");

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
                <button onClick={this.increment}>increment</button>
                <Link to="/test">notfound</Link>
                <Link to="/budget">budget</Link>
            </div>
        );
    }
}