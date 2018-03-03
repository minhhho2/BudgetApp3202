import * as React from "react";
import { Form, Button, Segment, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import RegisterStore from "./RegisterStore";

export default class RegisterComponent extends React.Component {
    changeUsernameHandler = e => {
        RegisterStore.credentials.username = e.currentTarget.value;
    }

    changePasswordHandler = e => {
        RegisterStore.credentials.newPassword = e.currentTarget.value;
    }

    changePasswordConfirmHandler = e => {
        RegisterStore.credentials.newPasswordConfirm = e.currentTarget.value;
    }

    render() {
        return (
            <div>
                <Segment
                    style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", position: "absolute" }}
                >
                    <Header as="h2">Register</Header>
                    <Form onSubmit={() => RegisterStore.register()}>
                        <Form.Field>
                            <label>Username</label>
                            <input placeholder="Username" onChange={this.changeUsernameHandler} />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input placeholder="Password" onChange={this.changePasswordHandler} />
                        </Form.Field>
                        <Form.Field>
                            <label>Confirm password</label>
                            <input placeholder="Confirm password" onChange={this.changePasswordConfirmHandler} />
                        </Form.Field>
                        <Button positive type="submit">Register</Button>
                        <Button as={Link} to="/">Cancel</Button>
                    </Form>
                </Segment>
            </div>
        );
    }
}