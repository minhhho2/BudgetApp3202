import * as React from "react";
import { observer } from "mobx-react";
import { Header } from "semantic-ui-react";

@observer
export default class DashboardComponent extends React.Component {
    render() {
        return (
            <div>
                <Header>
                    <Header.Content>Welcome to cloudstacks</Header.Content>
                </Header>
            </div>
        );
    }
}