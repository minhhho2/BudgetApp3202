import * as React from "react";
import {
    Form, Checkbox, Button, Header, Dropdown
} from 'semantic-ui-react'

import { observer } from "mobx-react";
import SettingStore from "./SettingStore";
import Chart from 'chart.js';

@observer
export default class SettingView extends React.Component {

    componentDidMount() {
        SettingStore.getSettings();
    }

    // handle method of notification
    handleEmailChange = (e, data) => { SettingStore.emails = !SettingStore.emails };
    handleTextChange = (e, data) => { SettingStore.texts = !SettingStore.texts };
    handleSharingChange = (e, data) => { SettingStore.sharing = !SettingStore.sharing };

    save = () => {
        SettingStore.saveSettings();
    }

    render() {

        return (
            <div>
                <Header as='h3'>Method of Notifications</Header>
                <Form.Checkbox
                    toggle
                    label="Email notification"
                    onClick={this.handleEmailChange}
                    checked={SettingStore.emails}
                />
                <br />
                <Form.Checkbox
                    toggle
                    label="Text notification"
                    onClick={this.handleTextChange}
                    checked={SettingStore.texts}
                />
                <br />

                <Form.Checkbox
                    toggle
                    label="Share budget information"
                    onClick={this.handleSharingChange}
                    checked={SettingStore.sharing}
                />
                <br />

                <Header as='h3'>Types of Notifications</Header>
                <Form.Dropdown placeholder='notifications'
                    fluid multiple selection
                    options={Array.apply(null, SettingStore.availableNotifications)}
                />

                <br />
                <Button toggle onClick={this.save}> Save </Button>
            </div >
        );
    }
}