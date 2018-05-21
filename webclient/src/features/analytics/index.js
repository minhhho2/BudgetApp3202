import * as React from "react";
import { observer } from "mobx-react";
import { Icon } from "semantic-ui-react";
import AnalyticsStore from "./AnalyticsStore";

export default class AnalyticsComponent extends React.Component {

    render() {
        return (
            <div>
                <h1>
                    <Icon name="line chart" />
                    Compare and analyse your finances!
                </h1>

                <h3> Compare </h3>
                <ul>
                    <li>
                        Compare income
                        <ul>
                            <li>By age</li>
                            <li>By type</li>
                        </ul>
                    </li>
                    <li>
                        Compare expenses
                        <ul>
                            <li>By age</li>
                            <li>By type</li>
                        </ul>
                    </li>
                    <li>
                        Compare your delta
                        <ul>
                            <li>By age</li>
                        </ul>
                    </li>
                </ul>

                <h3> Self </h3>
                <ul>
                    <li>Income distribution</li>
                    <li>Expense distribution</li>
                </ul>
            </div>
        )
    }
}