import * as React from "react";
import { observer } from "mobx-react";
import {
    Icon, Grid, Form, Input, Field, Image,
    Segment, Divider, Button, Select
} from "semantic-ui-react";
import ProfileStore from "./ProfileStore.js";

@observer
export default class ProfileComponent extends React.Component {
    componentDidMount() {
        ProfileStore.getData();
    }

    handleSave = () => {
        ProfileStore.save();
        ProfileStore.editable = true;
    }

    handleEdit = () => {
        ProfileStore.editable = !ProfileStore.editable;
    }

    handleChangeFirstName = (e) => {
        ProfileStore.firstname = e.target.value;
    }
    handleChangeLastname = (e) => {
        ProfileStore.lastname = e.target.value;
    }
    handleChangeBirthday = (e) => {
        ProfileStore.birthday = e.target.value;
    }
    handleChangeGender = (e) => {
        ProfileStore.gender = e.target.value;
    }

    handleChangeEmailAddress = (e) => {
        ProfileStore.emailAddress = e.target.value;
    }
    handleChangeHomeAddress = (e) => {
        ProfileStore.homeAddress = e.target.value;
    }
    handleChangePhoneNumber = (e) => {
        ProfileStore.phoneNumber = e.target.value;
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
                            <Image src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                                size='small' wrapped
                            />
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

                                    <Form.Field inline
                                        disabled={ProfileStore.editable}
                                        control='input'
                                        label="Birthday"
                                        type="date"
                                        value={new Date()}
                                        onChange={this.handleChangeBirthday}
                                    />
                                    <Form.Field>
                                        <Select
                                            disabled={ProfileStore.editable}
                                            label='Gender'
                                            placeholder='gender'
                                            value={ProfileStore.gender}
                                            onChange={this.handleChangeGender}
                                            options={[
                                                { key: 'male', value: 'male', text: 'male' },
                                                { key: 'female', value: 'female', text: 'female' }
                                            ]}
                                        />

                                    </Form.Field>

                                    <Divider horizontal>Contact Information</Divider>

                                    <Form.Field inline
                                        disabled={ProfileStore.editable}
                                        control='input'
                                        label='Email Address'
                                        placeholder='email'
                                        value={ProfileStore.emailAddress}
                                        onChange={this.handleChangeEmailAddress}
                                    />
                                    <Form.Field inline
                                        disabled={ProfileStore.editable}
                                        control='input'
                                        label='Home Address'
                                        placeholder='home address'
                                        value={ProfileStore.homeAddress}
                                        onChange={this.handleChangeHomeAddress}
                                    />
                                    <Form.Field inline
                                        disabled={ProfileStore.editable}
                                        control='input'
                                        label='Number'
                                        placeholder='number'
                                        value={ProfileStore.phoneNumber}
                                        onChange={this.handleChangePhoneNumber}
                                    />

                                </Form>
                            </h4>
                            <Form>
                                <Form.Group widths="equal">
                                    <Form.Field>
                                        <Button fluid onClick={this.handleSave}> Save </Button>
                                    </Form.Field>
                                    <Form.Field>
                                        <Button fluid onClick={this.handleEdit}>
                                            {ProfileStore.editable ?
                                                "Edit" :
                                                "Cancel"}
                                        </Button>
                                    </Form.Field>
                                </Form.Group>
                            </Form>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>

            </div>
        );
    }
} 