import * as React from "react";
import {
    Divider, Form, Label, Input, TextArea,
    Icon, Header, Select, Button, Checkbox,
    Table,
    Tab
} from 'semantic-ui-react'
import TxModal from "./TxModal";
import IncomeModal from "./IncomeModal";
import ExpenseModal from "./ExpenseModal";
import EditBudgetModal from "./EditBudgetModal";

import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import BudgetStore from "./BudgetStore";
import EditBudgetStore from "./EditBudgetStore";
import TxStore from "./TxStore";
import ExpenseStore from "./ExpenseStore";
import IncomeStore from "./IncomeStore";

@observer
export default class BudgetComponent extends React.Component {
    componentDidMount() {
        BudgetStore.getBudgets();
        BudgetStore.getIncomes();
        BudgetStore.getExpenses();
        BudgetStore.getTransactions();
    }

    delete = (id) => {
        BudgetStore.deleteBudget(id);
    }

    deleteTx = (id) => {
        TxStore.delete(id);
    }

    deleteExpense = (id) => {
        ExpenseStore.delete(id);
    }

    deleteIncome = (id) => {
        IncomeStore.delete(id);
    }

    openTxModal = () => {
        BudgetStore.txModal = true;
    }

    openEditBudgetModal = (id) => {
        BudgetStore.editBudgetModal = true;

        EditBudgetStore.id = id;
        if (EditBudgetStore.id != undefined) {
            EditBudgetStore.getData(id);
        }
    }

    openIncomeModal = (id) => {
        console.log("open income modal with id: " + id);
        BudgetStore.editIncomeModal = true;

        IncomeStore.id = id;
        if (IncomeStore.id != undefined) {
            IncomeStore.getData(id);
        }
    }

    openExpenseModal = () => {
        BudgetStore.expenseModal = true;
    }



    render() {
        const { budgets, incomes, expenses, transactions } = BudgetStore;

        return (
            <div style={{ overflow: 'auto' }}>
                <TxModal />
                <IncomeModal />
                <ExpenseModal />
                <EditBudgetModal />
                <Header as="h2">
                    <Header.Content>Personal finance</Header.Content>
                </Header>
                <Button
                    positive
                    onClick={() => this.openEditBudgetModal(undefined)}
                >
                    <Icon name="add" />
                    New savings goal
                </Button>
                <Button.Group>
                    <Button
                        color="teal"
                        onClick={() => this.openIncomeModal(undefined)}
                    >
                        <Icon name="plus" />
                        Income
                    </Button>
                    <Button.Or />
                    <Button
                        color="orange"
                        onClick={this.openExpenseModal}
                    >
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
                                    <Button primary onClick={() => this.openEditBudgetModal(budget.id)}>
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

                <h4>Recuring incomes</h4>
                <Table color="violet" selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Amount</Table.HeaderCell>
                            <Table.HeaderCell>Timing</Table.HeaderCell>
                            <Table.HeaderCell>End date</Table.HeaderCell>
                            <Table.HeaderCell />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {incomes.map((income, index) => (
                            <Table.Row key={index}>
                                <Table.Cell>{income.name}</Table.Cell>
                                <Table.Cell>{income.description}</Table.Cell>
                                <Table.Cell>{income.amount}</Table.Cell>
                                <Table.Cell>{income.frequency}/{income.timeunit}</Table.Cell>
                                <Table.Cell>{income.end_date}</Table.Cell>
                                <Table.Cell>
                                    <Button primary onClick={() => this.openIncomeModal(income.id)}>
                                        <Icon name="edit" />
                                        Edit
                                    </Button>
                                    <Button negative onClick={() => this.deleteIncome(income.id)}>
                                        <Icon name="delete" />
                                        Delete
                                    </Button>
                                </Table.Cell>
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
                            <Table.HeaderCell>Timing</Table.HeaderCell>
                            <Table.HeaderCell>End date</Table.HeaderCell>
                            <Table.HeaderCell />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {expenses.map((expense, index) => (
                            <Table.Row key={index}>
                                <Table.Cell>{expense.name}</Table.Cell>
                                <Table.Cell>{expense.description}</Table.Cell>
                                <Table.Cell>{expense.amount}</Table.Cell>
                                <Table.Cell>{expense.frequency}/{expense.timeunit}</Table.Cell>
                                <Table.Cell>{expense.end_date}</Table.Cell>
                                <Table.Cell>
                                    <Button primary onClick={this.openExpenseModal}>
                                        <Icon name="edit" />
                                        Edit
                                    </Button>
                                    <Button negative onClick={() => this.deleteExpense(expense.id)}>
                                        <Icon name="delete" />
                                        Delete
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>

                <h4>One-off expenses</h4>
                <Table color="red" selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Amount</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {transactions.map((tx, index) => (
                            <Table.Row
                                key={index}
                                onClick={() => TxStore.delete(tx.id)}
                            >
                                <Table.Cell>{tx.description}</Table.Cell>
                                <Table.Cell>{tx.amount}</Table.Cell>
                                <Table.Cell>{tx.dt}</Table.Cell>
                                <Table.Cell>
                                    <Button primary onClick={this.openTxModal}>
                                        <Icon name="edit" />
                                        Edit
                                    </Button>
                                    <Button negative onClick={() => this.deleteTx(tx.id)}>
                                        <Icon name="delete" />
                                        Delete
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}