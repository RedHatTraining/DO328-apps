import React, { FormEvent } from "react";
import {
    Form,
    FormGroup,
    TextInput,
    ActionGroup,
    Button,
    ButtonType,
    Alert,
    AlertActionCloseButton
} from "@patternfly/react-core";
import { ShelterService } from "../Services/ShelterService";
import { Shelter } from "../Models/Shelter";


type ShelterFormProps = {
    shelterService: ShelterService
};

export type ShelterFormState = {
    showInvalidFormAlert: boolean;
    showSubmitSucessAlert: boolean;
    showSubmitErrorAlert: boolean;
    shelter: Shelter;
};

export default class ShelterCreateForm extends React.Component<ShelterFormProps, ShelterFormState> {

    constructor(props: ShelterFormProps) {
        super(props);
        this.state = {
            showInvalidFormAlert: false,
            showSubmitSucessAlert: false,
            showSubmitErrorAlert: false,
            shelter: {
                shelterName: "",
                state: "",
                country: "",
                address: "",
                email: "",
                phoneNumber: ""
            }
        };
    }

    private handleNameChange(shelterName: string) {
        // Inmutability: instead of modifying the state,
        // we make a copy with the new value, and then
        // set the new state
        const shelter = { ...this.state.shelter, shelterName };
        this.setState({
            shelter
        });
    }

    private handleStateChange(state: string) {
        // Inmutability: instead of modifying the state,
        // we make a copy with the new value, and then
        // set the new state
        const shelter = { ...this.state.shelter, state };
        this.setState({
            shelter
        });
    }

    private handleCountryChange(country: string) {
        // Inmutability: instead of modifying the state,
        // we make a copy with the new value, and then
        // set the new state
        const shelter = { ...this.state.shelter, country };
        this.setState({
            shelter
        });
    }

    private handleAddressChange(address: string) {
        // Inmutability: instead of modifying the state,
        // we make a copy with the new value, and then
        // set the new state
        const shelter = { ...this.state.shelter, address };
        this.setState({
            shelter
        });
    }

    private handleEmailChange(email: string) {
        // Inmutability: instead of modifying the state,
        // we make a copy with the new value, and then
        // set the new state
        const shelter = { ...this.state.shelter, email };
        this.setState({
            shelter
        });
    }

    private handlePhoneNumberChange(phoneNumber: string) {
        // Inmutability: instead of modifying the state,
        // we make a copy with the new value, and then
        // set the new state
        const shelter = { ...this.state.shelter, phoneNumber };
        this.setState({
            shelter
        });
    }

    private async handleFormSubmit(event: FormEvent) {
        if (this.isFormValid()) {
            try {
                await this.props.shelterService.create(this.state.shelter);
                this.showSuccessAlert();
            } catch (error) {
                this.showErrorAlert();
            }
        } else {
            this.setState({ showInvalidFormAlert: true });
        }
        event.preventDefault();
    }

    private isFormValid() {
        return this.state.shelter.shelterName;
    }

    private showSuccessAlert() {
        this.setState({ showSubmitSucessAlert: true });
        this.hideAlertsAfter(3000);
    }

    private showErrorAlert() {
        this.setState({ showSubmitErrorAlert: true });
        this.hideAlertsAfter(3000);
    }

    private hideAlertsAfter(millis: number) {
        setTimeout(() => {
            this.setState({
                showSubmitSucessAlert: false,
                showSubmitErrorAlert: false,
            });
        }, millis);
    }

    private handleCloseInvalidFormAlert() {
        this.setState({ showInvalidFormAlert: false });
    }

    public render() {
        const { shelter, showInvalidFormAlert } = this.state;
        return (
            <Form onSubmit={this.handleFormSubmit.bind(this)}>
                {this.renderCreationSuccessAlert()}
                {this.renderCreationErrorAlert()}
                {showInvalidFormAlert &&
                    <Alert
                        id="myalert"
                        className="popup"
                        variant="danger"
                        title="Invalid form"
                        action={<AlertActionCloseButton
                            onClose={this.handleCloseInvalidFormAlert.bind(this)}
                        />}>
                        Please complete all required fields
                    </Alert>}
                <FormGroup
                    label="Name"
                    isRequired
                    fieldId="shelter-form-name"
                    helperText="Please provide your full name"
                >
                    <TextInput
                        isRequired
                        type="text"
                        id="shelter-form-name"
                        name="shelter-form-name"
                        aria-describedby="shelter-form-name-helper"
                        value={shelter.shelterName}
                        onChange={this.handleNameChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup
                    label="State"
                    isRequired
                    fieldId="shelter-form-state"
                    helperText="Please provide the state"
                >
                    <TextInput
                        isRequired
                        type="text"
                        id="shelter-form-state"
                        name="shelter-form-state"
                        aria-describedby="shelter-form-name-helper"
                        value={shelter.state}
                        onChange={this.handleStateChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup
                    label="Country"
                    isRequired
                    fieldId="shelter-form-country"
                    helperText="Please provide the country"
                >
                    <TextInput
                        isRequired
                        type="text"
                        id="shelter-form-country"
                        name="shelter-form-country"
                        aria-describedby="shelter-form-name-helper"
                        value={shelter.country}
                        onChange={this.handleCountryChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup
                    label="Address"
                    isRequired
                    fieldId="shelter-form-address"
                    helperText="Please provide the address"
                >
                    <TextInput
                        isRequired
                        type="text"
                        id="shelter-form-address"
                        name="shelter-form-address"
                        aria-describedby="shelter-form-name-helper"
                        value={shelter.address}
                        onChange={this.handleAddressChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup label="Email" isRequired fieldId="shelter-form-email">
                    <TextInput
                        isRequired
                        type="email"
                        id="shelter-form-email"
                        name="shelter-form-email"
                        value={shelter.email}
                        onChange={this.handleEmailChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup label="Phone number" isRequired fieldId="shelter-form-number">
                    <TextInput
                        isRequired
                        type="tel"
                        id="shelter-form-number"
                        placeholder="555-555-5555"
                        name="shelter-form-number"
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


    private renderCreationErrorAlert(): React.ReactNode | null {
        if (this.state.showSubmitErrorAlert) {
            return <Alert variant="danger" title="Shelter creation failed" />;
        }
        return null;
    }

    private renderCreationSuccessAlert(): React.ReactNode | null {
        if (this.state.showSubmitSucessAlert) {
            return <Alert
                variant="success"
                title="Shelter created"
            />;
        }
        return null;
    }

}


