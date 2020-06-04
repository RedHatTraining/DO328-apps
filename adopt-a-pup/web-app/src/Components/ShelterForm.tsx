import React, { FormEvent } from "react";
import {
    Form,
    FormGroup,
    TextInput,
    ActionGroup,
    Button,
    ButtonType
} from "@patternfly/react-core";
import { ShelterService } from "../Services/ShelterService";
import {Shelter} from "../Models/Shelter";


type ShelterFormProps = {
    shelterService: ShelterService
};

type ShelterFormState = {
    shelter: Shelter;
};

export default class ShelterForm extends React.Component<ShelterFormProps, ShelterFormState> {

    constructor(props: ShelterFormProps) {
        super(props);
        this.state = { shelter: {
                shelterName: "",
                state: "",
                country: "",
                address: "",
                email: "",
                phoneNumber: ""
            }};
    }

    private handleNameChange(shelterName: string) {
        this.state.shelter.shelterName = shelterName;
    }

    private handleStateChange(state: string) {
        this.state.shelter.state = state;
    }

    private handleCountryChange(country: string) {
        this.state.shelter.country = country;
    }

    private handleAddressChange(address: string) {
        this.state.shelter.address = address;
    }

    private handleEmailChange(email: string) {
        this.state.shelter.email = email;
    }

    private handlePhoneNumberChange(phoneNumber: string) {
        this.state.shelter.phoneNumber = phoneNumber;
    }

    private async handleFormSubmit(event: FormEvent) {
        this.props.shelterService.create(this.state.shelter);
        event.preventDefault();
    }

    public render() {
        const shelter = this.state.shelter;
        return (
            <Form onSubmit={this.handleFormSubmit.bind(this)}>
                <FormGroup
                    label="Name"
                    isRequired
                    fieldId="simple-form-name"
                    helperText="Please provide your full name"
                >
                    <TextInput
                        isRequired
                        type="text"
                        id="simple-form-name"
                        name="simple-form-name"
                        aria-describedby="simple-form-name-helper"
                        value={shelter.shelterName}
                        onChange={this.handleNameChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup
                    label="State"
                    isRequired
                    fieldId="simple-form-state"
                    helperText="Please provide the state"
                >
                    <TextInput
                        isRequired
                        type="text"
                        id="simple-form-state"
                        name="simple-form-state"
                        aria-describedby="simple-form-name-helper"
                        value={shelter.state}
                        onChange={this.handleStateChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup
                    label="Country"
                    isRequired
                    fieldId="simple-form-country"
                    helperText="Please provide the country"
                >
                    <TextInput
                        isRequired
                        type="text"
                        id="simple-form-country"
                        name="simple-form-country"
                        aria-describedby="simple-form-name-helper"
                        value={shelter.country}
                        onChange={this.handleCountryChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup
                    label="Address"
                    isRequired
                    fieldId="simple-form-address"
                    helperText="Please provide the address"
                >
                    <TextInput
                        isRequired
                        type="text"
                        id="simple-form-address"
                        name="simple-form-address"
                        aria-describedby="simple-form-name-helper"
                        value={shelter.address}
                        onChange={this.handleAddressChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup label="Email" isRequired fieldId="simple-form-email">
                    <TextInput
                        isRequired
                        type="email"
                        id="simple-form-email"
                        name="simple-form-email"
                        value={shelter.email}
                        onChange={this.handleEmailChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup label="Phone number" isRequired fieldId="simple-form-number">
                    <TextInput
                        isRequired
                        type="tel"
                        id="simple-form-number"
                        placeholder="555-555-5555"
                        name="simple-form-number"
                        value={shelter.phoneNumber}
                        onChange={this.handlePhoneNumberChange.bind(this)}
                    />
                </FormGroup>
                <ActionGroup>
                    <Button variant="primary" type={ButtonType.submit}>Create Shelter</Button>
                </ActionGroup>
            </Form>
        );
    }

}


