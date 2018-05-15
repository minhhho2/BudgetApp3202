import * as React from "react";
import {
    Form, Checkbox
} from 'semantic-ui-react'

import { observer } from "mobx-react";
import SettingStore from "./SettingStore";

@observer
export default class SettingView extends React.Component {

    handleEmailChange = (e, { value }) => SettingStore.emails = !value;
    handleTextChange = (e, { value }) => SettingStore.texts = !value;
    handleSharingChange = (e, { value }) => SettingStore.sharing = !value;

    render() {

        return (
            <div>
                <Form>
                    <Form.Field>
                        <Checkbox
                            toggle
                            label="Email notification"
                            value={SettingStore.emails}
                            checked={SettingStore.emails === true}
                            onChange={this.handleEmailChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox
                            toggle
                            label="Text notification"
                            value={SettingStore.texts}
                            checked={SettingStore.texts === true}
                            onChange={this.handleTextChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox
                            toggle
                            label="Share budger information"
                            value={SettingStore.sharing}
                            checked={SettingStore.sharing === true}
                            onChange={this.handleSharingChange}
                        />
                    </Form.Field>
                </Form>

            </div>
        );
    }
}