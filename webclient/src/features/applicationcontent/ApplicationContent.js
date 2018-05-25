import * as React from "react";
import { Table } from "semantic-ui-react";
import { observer } from "mobx-react";

import TransactionTable from "./TransactionTable";

// TODO: PASS INCOME && EXPENSES DOWN AS PROPS
@observer
export default class ApplicationContent extends React.Component {

    calcTotal = (array) => {
        var total = 0;
        array.forEach((el) => {
            total += el.amount;
        });
        return total;
    }

    render() {
        const headers = ['Income', 'Expense', 'Total'];

        return (
            <div>
                <h2> Summary </h2>
                <Table color={"black"}>
                    <Table.Header>
                        <Table.Row>
                            {headers.map((header, index) => (
                                <Table.HeaderCell key={index}> {header} </Table.HeaderCell>
                            ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>

                        <Table.Row>
                            <Table.Cell> {this.calcTotal(this.props.income)} </Table.Cell>
                            <Table.Cell> {this.calcTotal(this.props.expense)} </Table.Cell>
                            <Table.Cell>
                                {
                                    this.calcTotal(this.props.income) -
                                    this.calcTotal(this.props.expense)
                                }
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>

                <TransactionTable name="Income" color="green" dataset={this.props.income} />
                <br />
                <TransactionTable name="Expense" color="red" dataset={this.props.expense} />
            </div>
        );
    }
}

