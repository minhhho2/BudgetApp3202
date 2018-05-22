import * as React from "react";
import { observer } from "mobx-react";
import { Form, Button, Segment, Header, Input, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LoginStore from "./LoginStore";

@observer
export default class LoginComponent extends React.Component {
    changeUsernameHandler = e => {
        LoginStore.credentials.username = e.currentTarget.value;
    }

    changePasswordHandler = e => {
        LoginStore.credentials.password = e.currentTarget.value;
    }

    render() {
        return (
            <div>
                <Segment
                    style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute' }}
                >
                    <Header as="h2">Login</Header>
                    <Form onSubmit={() => LoginStore.signIn()}>
                        <Form.Field>
                            <label>Username</label>
                            <Input
                                icon='user'
                                value={LoginStore.credentials.username}
                                onChange={this.changeUsernameHandler}
                                placeholder="Username"
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <Input
                                icon='lock'
                                value={LoginStore.credentials.password}
                                onChange={this.changePasswordHandler}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Field>
                        <Button positive type="submit">Login</Button>
                        <Button as={Link} to="/register">Register</Button>
                    </Form>
                </Segment>
            </div>
        );
    }
}