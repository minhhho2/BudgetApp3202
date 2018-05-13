import * as React from "react";
import {
    Divider, Form, Label, Input, TextArea,
    Icon, Header, Select, Button, Checkbox,
    Table
} from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import BudgetStore from "./BudgetStore";

@observer
export default class BudgetComponent extends React.Component {
    componentDidMount() {
        BudgetStore.getBudgets();
    }

    render() {
        const { budgets, incomes, expenses } = BudgetStore;

        return (
            <div>
                <Header as="h2">
                    <Header.Content>My budgets</Header.Content>
                </Header>
                <Button
                    positive
                    as={Link}
                    to="/budget/create"
                >
                    <Icon name="add" />
                    New
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

                <Table color="olive" selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Amount</Table.HeaderCell>
                            <Table.HeaderCell>End date</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {budgets.map((budget, index) => (
                            <Table.Row key={index} onClick={() => window.location.href = `/budget/edit/${budget.id}`}>
                                <Table.Cell>{budget.name}</Table.Cell>
                                <Table.Cell>{budget.description}</Table.Cell>
                                <Table.Cell>{budget.amount}</Table.Cell>
                                <Table.Cell>{budget.end_date}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>

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
                        {income.map((income, index) => (
                            <Table.Row key={index} onClick={() => window.location.href = `/budget/edit/${income.id}`}>
                                <Table.Cell>{income.name}</Table.Cell>
                                <Table.Cell>{income.description}</Table.Cell>
                                <Table.Cell>{income.amount}</Table.Cell>
                                <Table.Cell>{income.end_date}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>

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