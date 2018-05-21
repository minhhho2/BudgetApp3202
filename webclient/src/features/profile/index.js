import * as React from "react";
import { observer } from "mobx-react";
import { Icon } from "semantic-ui-react";

@observer
export default class ProfileComponent extends React.Component {

    render() {
        return (
            <div>
                <h1>
                    <Icon name="user" />
                    Profile
                </h1>
            </div>
        );
    }
} 