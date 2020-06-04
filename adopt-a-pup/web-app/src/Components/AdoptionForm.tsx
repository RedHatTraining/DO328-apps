import React, { FormEvent } from "react";
import {
    Form,
    FormGroup,
    TextInput,
    ActionGroup,
    Button,
    ButtonType,
    FormSelect,
    FormSelectOption,
    Checkbox,
    Alert
} from "@patternfly/react-core";
import { AdoptionService } from "../Services/AdoptionService";
import { Residency } from "../Models/Residency";


type AdoptionFormProps = {
    adoptionService: AdoptionService,
    animalId: string
};

type AdoptionFormState = {
    username: string,
    email: string,
    residency: Residency,
    squareFootageOfHome: number,
    kidsUnder16: boolean,
    occupation: string,
    ownOtherAnimals: boolean,
    showAdoptSucessAlert: boolean,
    showAdoptErrorAlert: boolean
};

export default class AdoptionForm extends React.Component<AdoptionFormProps, AdoptionFormState> {

    constructor(props: AdoptionFormProps) {
        super(props);
        this.state = {
            username: "",
            email: "",
            occupation: "",
            residency: Residency.APARTMENT,
            squareFootageOfHome: 0,
            kidsUnder16: false,
            ownOtherAnimals: false,
            showAdoptErrorAlert: false,
            showAdoptSucessAlert: false
        };
    }

    private handleNameChange(username: string) {
        this.setState({ username });
    }

    private handleEmailChange(email: string) {
        this.setState({ email });
    }

    private handleOccupationChange(occupation: string) {
        this.setState({ occupation });
    }

    private handleResidencyChange(residency: Residency) {
        this.setState({ residency });
    }

    private handleSquareFootageChange(squareFootageOfHome: string) {
        this.setState({ squareFootageOfHome: parseInt(squareFootageOfHome) });
    }

    private handleKidsUnder16Change(kidsUnder16: boolean) {
        this.setState({ kidsUnder16 });
    }

    private handleOwnOtherAnimalsChange(ownOtherAnimals: boolean) {
        this.setState({ ownOtherAnimals });
    }

    private async handleFormSubmit(event: FormEvent) {
        const application = {
            animalId: this.props.animalId,
            ...this.state
        };

        event.preventDefault();

        try {
            await this.props.adoptionService.applyForAdoption(application);
            this.showSuccessAlert();
        } catch {
            this.showErrorAlert();
        }

    }

    private showSuccessAlert() {
        this.setState({ showAdoptSucessAlert: true });
        this.hideAlertsAfter(3000);
    }

    private showErrorAlert() {
        this.setState({ showAdoptErrorAlert: true });
        this.hideAlertsAfter(3000);
    }

    private hideAlertsAfter(millis: number) {
        setTimeout(() => {
            this.setState({
                showAdoptErrorAlert: false,
                showAdoptSucessAlert: false,
            });
        }, millis);
    }

    public render() {
        const {
            username,
            email,
            occupation,
            residency,
            squareFootageOfHome,
            kidsUnder16,
            ownOtherAnimals
        } = this.state;

        return (
            <Form onSubmit={this.handleFormSubmit.bind(this)}>
                {this.renderAdoptSuccessAlert()}
                {this.renderAdoptErrorAlert()}
                <FormGroup
                    label="Name"
                    isRequired
                    fieldId="simple-form-username"
                    helperText="Please provide your name"
                >
                    <TextInput
                        isRequired
                        type="text"
                        id="simple-form-username"
                        name="simple-form-username"
                        aria-describedby="simple-form-name-helper"
                        value={username}
                        onChange={this.handleNameChange.bind(this)}
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
                <FormGroup
                    label="Occupation"
                    isRequired
                    fieldId="simple-form-occupation"
                    helperText="Please provide your occupation"
                >
                    <TextInput
                        isRequired
                        type="text"
                        id="simple-form-occupation"
                        name="simple-form-occupation"
                        aria-describedby="simple-form-name-helper"
                        value={occupation}
                        onChange={this.handleOccupationChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup
                    label="Residency"
                    isRequired
                    fieldId="simple-form-residency"
                    helperText="Please provide the address"
                >
                    <FormSelect
                        value={residency}
                        onChange={(residency) => this.handleResidencyChange(residency as Residency)}
                        aria-label="Select Residency">
                        <FormSelectOption
                            key={Residency.HOUSE}
                            value={Residency.HOUSE}
                            label={Residency.HOUSE}
                        />
                        <FormSelectOption
                            key={Residency.APARTMENT}
                            value={Residency.APARTMENT}
                            label={Residency.APARTMENT}
                        />
                    </FormSelect>
                </FormGroup>

                <FormGroup label="Square Footage of Home" isRequired fieldId="simple-form-footage">
                    <TextInput
                        isRequired
                        type="number"
                        id="simple-form-footage"
                        name="simple-form-footage"
                        value={squareFootageOfHome}
                        onChange={this.handleSquareFootageChange.bind(this)}
                    />
                </FormGroup>

                <FormGroup fieldId="simple-form-kids">
                    <Checkbox
                        label="I have kids under 16"
                        id="simple-form-kids"
                        name="simple-form-kids"
                        aria-label="I have kids under 16"
                        isChecked={kidsUnder16}
                        onChange={this.handleKidsUnder16Change.bind(this)} />
                </FormGroup>

                <FormGroup fieldId="simple-form-other-animals">
                    <Checkbox
                        label="I own other animals"
                        id="simple-form-other-animals"
                        name="simple-form-other-animals"
                        aria-label="I own other animals"
                        isChecked={ownOtherAnimals}
                        onChange={this.handleOwnOtherAnimalsChange.bind(this)} />
                </FormGroup>

                <ActionGroup>
                    <Button variant="primary" type={ButtonType.submit}>Apply for Adoption</Button>
                </ActionGroup>

            </Form>
        );
    }

    private renderAdoptErrorAlert(): React.ReactNode | null {
        if (this.state.showAdoptErrorAlert) {
            return <Alert variant="danger" title="The adoption application failed" />;
        }
        return null;
    }

    private renderAdoptSuccessAlert(): React.ReactNode | null {
        if (this.state.showAdoptSucessAlert) {
            return <Alert
                variant="success"
                title="Congratulations! The Adoption application was sent."
            />;
        }
        return null;
    }

}


