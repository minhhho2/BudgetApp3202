import * as React from "react";
import { observer } from "mobx-react";
import { Icon, Form, Input, Select, Checkbox, Button, Table, Header } from "semantic-ui-react";
import AnalyticsStore from "./AnalyticsStore";
import incomeModal from "../budget/IncomeModal";
import TransactionTypes from "../budget/TransactionTypes";

@observer
export default class AnalyticsComponent extends React.Component {

    componentDidMount() {
        AnalyticsStore.clear()
    }

    handleChangeAge = (e) => {
        AnalyticsStore.age = !AnalyticsStore.age;
        AnalyticsStore.getData(AnalyticsStore.age, AnalyticsStore.gender);
    }

    handleChangeGender = (e) => {
        AnalyticsStore.gender = !AnalyticsStore.gender;
        AnalyticsStore.getData(AnalyticsStore.age, AnalyticsStore.gender);
    }

    render() {

        const { age, gender, userData, globalData } = AnalyticsStore;
        return (
            <div>
                <Form>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <Checkbox
                                label='Age'
                                value={age}
                                onClick={this.handleChangeAge}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox
                                label='Gender'
                                value={gender}
                                onClick={this.handleChangeGender}
                            />
                        </Form.Field>
                    </Form.Group>
                </Form>
                <Table>
                    <Table.Header>
                        <Table.Row widths="equal">
                            {["User", "WK Goals", "WK Income", "WK Expense"].map((elem, index) => {
                                return <Table.HeaderCell key={index} singleLine>{elem}</Table.HeaderCell>
                            })}
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            {console.log(userData)}
                            {userData.map((elem, index) => {
                                return <Table.Cell key={index}>
                                    <Header as='h2' textAlign='center'>{elem}</Header>
                                </Table.Cell>
                            })}
                        </Table.Row>

                        <Table.Row>
                            {globalData.map((elem, index) => {
                                return <Table.Cell key={index}>
                                    <Header as='h2' textAlign='center'>{elem}</Header>
                                </Table.Cell>
                            })}
                        </Table.Row>
                    </Table.Body>
                </Table>




            </div>
        )
    }
}