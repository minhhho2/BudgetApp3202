import * as React from "react";
import { Table } from "semantic-ui-react";
import { observer } from "mobx-react";

@observer
export default class TransactionTable extends React.Component {

    render() {

        const name = this.props.name;
        const headers = ['Date', 'Amount', 'category'];
        const color = this.props.color;
        const dataset = this.props.dataset;

        return (
            <div>
                <h2> {name} </h2>
                
                <Table color={color}>
                    <Table.Header>
                        <Table.Row>
                            {headers.map((header, index) => (
                                <Table.HeaderCell key={index}> {header} </Table.HeaderCell>
                            ))}
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {dataset.map((data, index) => (
                            <Table.Row key={index}>
                                <Table.Cell> {data.getDateString()} </Table.Cell>
                                <Table.Cell> {data.amount} </Table.Cell>
                                <Table.Cell> {data.type} </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

