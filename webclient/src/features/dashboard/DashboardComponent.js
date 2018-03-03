import * as React from "react";
import { Button } from "semantic-ui-react";
import { Container, Header, Icon } from "semantic-ui-react";



export default class DashboardComponent extends React.Component {

    render() {
        return (
            <div>
                <Container text>
                    <div>

                        <Header as='h2'>Budget App</Header>
                        <Icon name="dashboard" size="massive"></Icon>
                    </div>
                    <Button primary >Create</Button>
                    <Button primary >Expense</Button>
                    <Button primary >Income</Button>
                    <Button primary >Compare</Button>
                    <Button primary >Analyse</Button>
                </Container>
            </div>
        );
    }
}

/* 


*/