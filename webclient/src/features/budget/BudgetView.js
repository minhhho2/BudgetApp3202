import * as React from "react";
import {
    Divider, Form, Label, Input, TextArea,
    Icon, Header, Select, Button, Checkbox,
    Table
} from 'semantic-ui-react'
import TxModal from "./txmodal";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import BudgetStore from "./BudgetStore";

@observer
export default class BudgetComponent extends React.Component {
    componentDidMount() {
        BudgetStore.getBudgets();
    }

    delete = (id) => {
        BudgetStore.deleteBudget(id);
    }

    openTxModal = () => {
        BudgetStore.txModal = true;
    }

    render() {
        const { budgets, incomes, expenses } = BudgetStore;

        return (
            <div>
                <TxModal />
                <Header as="h2">
                    <Header.Content>Personal finance</Header.Content>
                </Header>
                <Button
                    positive
                    as={Link}
                    to="/budget/create"
                >
                    <Icon name="add" />
                    New savings goal
                </Button>
                <Button.Group>
                    <Button color="teal">
                        <Icon name="plus" />
                        Income
                    </Button>
                    <Button.Or />
                    <Button color="orange">
                        <Icon name="minus" />
                        Expense
                    </Button>
                </Button.Group>
                <div style={{ float: "right", paddingRight: "10em" }}>
                    <Button
                        primary
                        onClick={this.openTxModal}
                    >
                        <Icon name="money" />
                        Transaction
                    </Button>
                </div>

                <h4>My savings goals</h4>
                <Table color="olive" selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Amount</Table.HeaderCell>
                            <Table.HeaderCell>End date</Table.HeaderCell>
                            <Table.HeaderCell />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {budgets.map((budget, index) => (
                            <Table.Row key={index}>
                                <Table.Cell>{budget.name}</Table.Cell>
                                <Table.Cell>{budget.description}</Table.Cell>
                                <Table.Cell>{budget.amount}</Table.Cell>
                                <Table.Cell>{budget.end_date}</Table.Cell>
                                <Table.Cell>
                                    <Button primary as={Link} to={`/budget/edit/${budget.id}`}>
                                        <Icon name="edit" />
                                        Edit
                                    </Button>
                                    <Button negative onClick={() => this.delete(budget.id)}>
                                        <Icon name="delete" />
                                        Delete
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>

                <h4>Recuring encomes</h4>
                <Table color="violet" selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Amount</Table.HeaderCell>
                            <Table.HeaderCell>End date</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {incomes.map((income, index) => (
                            <Table.Row key={index} onClick={() => window.location.href = `/budget/edit/${income.id}`}>
                                <Table.Cell>{income.name}</Table.Cell>
                                <Table.Cell>{income.description}</Table.Cell>
                                <Table.Cell>{income.amount}</Table.Cell>
                                <Table.Cell>{income.end_date}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>

                <h4>Recuring expenses</h4>
                <Table color="orange" selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Amount</Table.HeaderCell>
                            <Table.HeaderCell>End date</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {expenses.map((expense, index) => (
                            <Table.Row key={index} onClick={() => window.location.href = `/budget/edit/${expense.id}`}>
                                <Table.Cell>{expense.name}</Table.Cell>
                                <Table.Cell>{expense.description}</Table.Cell>
                                <Table.Cell>{expense.amount}</Table.Cell>
                                <Table.Cell>{expense.end_date}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}