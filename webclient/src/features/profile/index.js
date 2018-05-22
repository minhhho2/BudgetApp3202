import * as React from "react";
import { observer } from "mobx-react";
import { Icon, Grid, Form, Input, Field, Image, Segment, Divider } from "semantic-ui-react";

@observer
export default class ProfileComponent extends React.Component {

    render() {
        return (
            <div>
                <h1>
                    <Icon name="user" />
                    Profile
                </h1>


                <Grid divided='vertically'>
                    <Grid.Row columns={2}>
                        <Grid.Column width={3}>
                            <Image src='https://i.pinimg.com/originals/82/2b/96/822b96b7c5c63142b4491c502749c443.jpg' size='small' wrapped />
                        </Grid.Column>
                        <Grid.Column width={10}>
                                <h4>
                                <Divider horizontal> Personal Information </Divider>
                                Occupation:
                                

                                <Divider horizontal>Contact Information</Divider>

                                Phone:
                                <br />
                                
                                Address:
                                <br />

                                E-mail:
                                <br />

                                <Divider horizontal>Basic Information</Divider>
                                Birthday:
                                <br />

                                Gender:
                                <br />
                            </h4>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </div>
        );
    }
} 