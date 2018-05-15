import * as React from "react";
import { Table } from "semantic-ui-react";
import { observer } from "mobx-react";

@observer
export default class CompareComponent extends React.Component {

    render() {
        const headers = ['Income', 'Expense', 'Total'];

        return (
            <div>
                <h2> Summary </h2>
                <h2> Summary </h2>
                <h2> Summary </h2>
                <h2> Summary </h2>


            </div>
        );
    }
}

