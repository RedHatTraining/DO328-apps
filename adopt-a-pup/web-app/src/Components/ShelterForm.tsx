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


type ShelterFormProps = {
    shelterService: ShelterService
};

type ShelterFormState = {
    name: string,
    state: string,
    country: string,
    address: string,
    email: string,
    phoneNumber: string
};

export default class ShelterForm extends React.Component<ShelterFormProps, ShelterFormState> {

    constructor(props: ShelterFormProps) {
        super(props);
        this.state = {
            name: "",
            state: "",
            country: "",
            address: "",
            email: "",
            phoneNumber: ""
        };
    }

    private handleNameChange(name: string) {
        this.setState({ name });
    }

    private handleStateChange(state: string) {
        this.setState({ state });
    }

    private handleCountryChange(country: string) {
        this.setState({ country });
    }

    private handleAddressChange(address: string) {
        this.setState({ address });
    }

    private handleEmailChange(email: string) {
        this.setState({ email });
    }

    private handlePhoneNumberChange(phoneNumber: string) {
        this.setState({ phoneNumber });
    }

    private async handleFormSubmit(event: FormEvent) {
        const { name } = this.state;
        this.props.shelterService.create({
            name
        });
        event.preventDefault();
    }

    public render() {
        const { name, country, state, address, email, phoneNumber } = this.state;

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
                        value={name}
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
                        value={state}
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
                        value={country}
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
                        value={address}
                        onChange={this.handleAddressChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup label="Email" isRequired fieldId="simple-form-email">
                    <TextInput
                        isRequired
                        type="email"
                        id="simple-form-email"
                        name="simple-form-email"
                        value={email}
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
                        value={phoneNumber}
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


