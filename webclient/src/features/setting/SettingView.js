import * as React from "react";
import {
    Form, Checkbox, Button, Header
} from 'semantic-ui-react'

import { observer } from "mobx-react";
import SettingStore from "./SettingStore";

@observer
export default class SettingView extends React.Component {

    // handle method of notification
    handleEmailChange = (e, { value }) => SettingStore.emails = !value | 0;
    handleTextChange = (e, { value }) => SettingStore.texts = !value | 0;

    // handle type of notification
    handleSharingChange = (e, { value }) => SettingStore.sharing = !value | 0;

    // handle privacy
    render() {

        return (
            <div>
                <Form>
                    <Form.Field>
                        <Header as='h3'>Method of Notifications</Header>
                        <Checkbox
                            toggle
                            label="Email notification"
                            value={SettingStore.emails}
                            checked={SettingStore.emails === 1}
                            onChange={this.handleEmailChange}
                        />
                        <br />

                        <Checkbox
                            toggle
                            label="Text notification"
                            value={SettingStore.texts}
                            checked={SettingStore.texts === 1}
                            onChange={this.handleTextChange}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Header as='h3'>Types of Notifications</Header>
                        <Checkbox
                            toggle
                            label="Exceed budget"
                        />
                        <br />
                        <Checkbox
                            toggle
                            label="Reach saving goal"
                        />
                        <br />
                        <Checkbox
                            toggle
                            label="Abnormal spending behavior"
                        />
                    </Form.Field>

                    <Form.Field>
                        <Header as='h3'>Privacy</Header>
                        <Checkbox
                            toggle
                            label="Share budget information"
                            value={SettingStore.sharing}
                            checked={SettingStore.sharing === 1}
                            onChange={this.handleSharingChange}
                        />
                    </Form.Field>
                    <Button toggle onClick={SettingStore.saveSetting}> Save </Button>

                </Form>
            </div >
        );
    }
}