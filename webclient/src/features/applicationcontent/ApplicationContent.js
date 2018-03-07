import * as React from "react";
import { Table } from "semantic-ui-react";
import { observer } from "mobx-react";

import TransactionTable from "./TransactionTable";

// TODO: PASS INCOME && EXPENSES DOWN AS PROPS
@observer
export default class ApplicationContent extends React.Component {

    render() {

        return (
            <div>
                <TransactionTable name="Income" color="green" dataset={this.props.income}/>
                <br />
                <TransactionTable name="Expense" color="red" dataset={this.props.expense}/>
            </div>
        );
    }
}

