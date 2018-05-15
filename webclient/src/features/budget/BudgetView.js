import * as React from "react";

import { Divider, Form, Label } from 'semantic-ui-react'
import { Select, Button, Checkbox, Icon, Progress } from 'semantic-ui-react'
import { observer } from "mobx-react";

import BudgetStore from "./BudgetStore";
import BudgetComponent from "./BudgetComponent";

@observer
export default class BudgetView extends React.Component {

    renderBudgetForm = () => {
        if (BudgetStore.isOpen == true) {
            return <BudgetComponent updateBudgets={this.updateBudgets} />
        }
    }

    openBudgetForm = () => {
        BudgetStore.isOpen = true;
    }

    updateBudgets = (budget) => {
        BudgetStore.budgets.aa
        BudgetStore.budgets.push(budget);
    }

    render() {
        return (
            <div>
                <Form>
                    <div>
                        <h2> Expense </h2>

                        <Icon name="add" onClick={this.openBudgetForm} />
                        {this.renderBudgetForm()}

                        {BudgetStore.budgets.map((budget, index) => {
                            return (
                                <div key={index}>                                    
                                    <Progress value='4' total='5' progress='percent'>
                                        Budget for {budget.category} @ {budget.frequency} for {budget.goal}
                                    </Progress>
                                    <br />
                                </div>
                            );
                        })}
                    </div>
                </Form>
            </div>
        );
    }
}