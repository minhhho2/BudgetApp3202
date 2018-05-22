import * as React from "react";
import { observer } from "mobx-react";
import { Icon, Grid, Form, Input, Field, Image, Segment, Divider, Button } from "semantic-ui-react";
import ProfileStore from "./ProfileStore.js";

@observer
export default class ProfileComponent extends React.Component {
    componentDidMount() {
        ProfileStore.getData();
        console.log(ProfileStore.birthday);
    }

    handleSave = () => {
        console.log("save");
        ProfileStore.editable = true;
    }

    handleEdit = () => {
        ProfileStore.editable = !ProfileStore.editable;
        console.log("editable is: " + ProfileStore.editable);
    }
    
    handleChangeFirstName = (e) => {
        ProfileStore.firstname = e.target.value
        console.log(e.target.value)
    }
    handleChangeLastname = (e) => {
        ProfileStore.lastname = e.target.value
        console.log(e.target.value)
    }
    handleChangeBirthday = (e) => {
        ProfileStore.birthday = e.target.value
        console.log(e.target.value)
    }

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
                                <Divider horizontal>Basic Information</Divider>
                                <Form>
                                    <Form.Field inline
                                        disabled={ProfileStore.editable}
                                        control='input'
                                        label='First name'
                                        placeholder='first name'
                                        value={ProfileStore.firstname}
                                        onChange={this.handleChangeFirstName}
                                    />
                                    <Form.Field inline
                                        disabled={ProfileStore.editable}
                                        control='input'
                                        label='Last name'
                                        placeholder='last name'
                                        value={ProfileStore.lastname}
                                        onChange={this.handleChangeLastname}
                                    />

                                    <Input 
                                        id="birthday"
                                        label="Birthday"
                                        name="requested_order_ship_date" 
                                        type="date"
                                        disabled={ProfileStore.editable}
                                        value={ProfileStore.birthday}
                                        onChange={this.handleChangeBirthday} 
                                    />

                                    <Divider horizontal>Contact Information</Divider>

                                    Phone Address E-mail

                                </Form>
                                <Button onClick={this.handleSave}> Save </Button>
                                <Button onClick={this.handleEdit}> Edit </Button>
                            </h4>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </div>
        );
    }
} 