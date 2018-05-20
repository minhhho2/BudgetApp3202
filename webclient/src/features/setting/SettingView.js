import * as React from "react";
import {
    Form, Checkbox, Button, Header, Dropdown
} from 'semantic-ui-react'

import { observer } from "mobx-react";
import SettingStore from "./SettingStore";

@observer
export default class SettingView extends React.Component {

    componentDidMount() {
        SettingStore.getSettings();
    }

    // handle method of notification
    handleEmailChange = (e, { value }) => SettingStore.emails = !value | 0;
    handleTextChange = (e, { value }) => SettingStore.texts = !value | 0;
    handleSharingChange = (e, { value }) => SettingStore.sharing = !value | 0;

    // handle type of notification

    // handle privacy
    render() {

        return (
            <div>
                <Header as='h3'>Method of Notifications</Header>
                <Form.Checkbox
                    toggle
                    label="Email notification"
                    value={SettingStore.emails}
                    checked={SettingStore.emails === 1}
                    onChange={this.handleEmailChange}
                />
                <br />
                <Form.Checkbox
                    toggle
                    label="Text notification"
                    value={SettingStore.texts}
                    checked={SettingStore.texts === 1}
                    onChange={this.handleTextChange}
                />
                <br />

                <Form.Checkbox
                    toggle
                    label="Share budget information"
                    value={SettingStore.sharing}
                    checked={SettingStore.sharing === 1}
                    onChange={this.handleSharingChange}
                />
                <br />

                <Header as='h3'>Types of Notifications</Header>
                <Form.Dropdown placeholder='notifications'
                    fluid multiple selection
                    options={Array.apply(null, SettingStore.availableNotifications)}
                />

                <br />

                <Button toggle onClick={SettingStore.saveSettings}> Save </Button>
            </div >
        );
    }
}