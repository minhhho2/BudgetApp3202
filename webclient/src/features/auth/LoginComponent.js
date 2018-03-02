import * as React from 'react';
import { Form, Button, Segment, Header } from 'semantic-ui-react';

export default class LoginComponent extends React.Component {
    render() {
        return (
            <div>
                <Segment style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute'}}>
                    <Header as='h2'>Login</Header>
                    <Form>
                        <Form.Field>
                            <label>First Name</label>
                            <input placeholder='First Name' />
                        </Form.Field>
                        <Form.Field>
                            <label>Last Name</label>
                            <input placeholder='Last Name' />
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Segment>
            </div>
        )
    }
}