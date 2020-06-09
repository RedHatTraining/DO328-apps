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
    Alert,
    AlertActionCloseButton
} from "@patternfly/react-core";
import { AdoptionService } from "../Services/AdoptionService";
import { Residency } from "../Models/Residency";
import BullseyeSpinner from "./BullseyeSpinner";
import { RESTConnectionError } from "../Services/RESTService";


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
    showAdoptSuccessAlert: boolean,
    showAdoptErrorAlert: boolean,
    showInvalidFormAlert: boolean,
    adoptionError: {
        title: string,
        description: string
    },
    isSubmitting: boolean;
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
            showAdoptSuccessAlert: false,
            showInvalidFormAlert: false,
            adoptionError: {
                title: "",
                description: ""
            },
            isSubmitting: false
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
        event.preventDefault();

        if (this.isFormValid()) {
            const { animalId } = this.props;
            const application = {
                animalId,
                username: this.state.username,
                email: this.state.email,
                occupation: this.state.occupation,
                residency: this.state.residency,
                squareFootageOfHome: this.state.squareFootageOfHome,
                kidsUnder16: this.state.kidsUnder16,
                ownOtherAnimals: this.state.ownOtherAnimals,
            };
            try {
                await this.props.adoptionService.applyForAdoption(application);
                this.showSuccessAlert();
            } catch (error) {
                this.showErrorAlert(error);
            }
        } else {
            this.setState({ showInvalidFormAlert: true });
        }
    }

    private isFormValid() {
        return this.state.username &&
            this.state.email &&
            this.state.residency &&
            this.state.occupation;
    }

    private showSuccessAlert() {
        this.setState({ showAdoptSuccessAlert: true });
        this.hideAlertsAfter(3000);
    }

    private showErrorAlert(error: Error) {
        let adoptionError = {
            title: error.name,
            description: error.message
        };
        if (error instanceof RESTConnectionError) {
            adoptionError.description = error.description;
        }
        this.setState({
            showAdoptErrorAlert: true,
            adoptionError,
            showAdoptSuccessAlert: false,
            showInvalidFormAlert: false
        });
        this.hideAlertsAfter(3000);
    }

    private hideAlertsAfter(millis: number) {
        setTimeout(() => {
            this.setState({
                showAdoptErrorAlert: false,
                showAdoptSuccessAlert: false,
            });
        }, millis);
    }

    private handleCloseInvalidFormAlert() {
        this.setState({ showInvalidFormAlert: false });
    }

    public render() {
        return (
            <React.Fragment>
                {this.state.isSubmitting ? this.renderLoader() : this.renderForm()}
            </React.Fragment>
        );
    }

    public renderLoader() {
        return <BullseyeSpinner />;
    }

    public renderForm() {
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
                {this.renderInvalidFormAlert()}
                <FormGroup
                    label="Name"
                    isRequired
                    fieldId="adoption-form-username"
                    helperText="Please provide your name"
                >
                    <TextInput
                        isRequired
                        type="text"
                        id="adoption-form-username"
                        name="adoption-form-username"
                        aria-describedby="adoption-form-name-helper"
                        value={username}
                        onChange={this.handleNameChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup label="Email" isRequired fieldId="adoption-form-email">
                    <TextInput
                        isRequired
                        type="email"
                        id="adoption-form-email"
                        name="adoption-form-email"
                        value={email}
                        onChange={this.handleEmailChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup
                    label="Occupation"
                    isRequired
                    fieldId="adoption-form-occupation"
                    helperText="Please provide your occupation"
                >
                    <TextInput
                        isRequired
                        type="text"
                        id="adoption-form-occupation"
                        name="adoption-form-occupation"
                        aria-describedby="adoption-form-name-helper"
                        value={occupation}
                        onChange={this.handleOccupationChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup
                    label="Residency"
                    isRequired
                    fieldId="adoption-form-residency"
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

                <FormGroup
                    label="Square Footage of Home"
                    isRequired
                    fieldId="adoption-form-footage"
                >
                    <TextInput
                        isRequired
                        type="number"
                        id="adoption-form-footage"
                        name="adoption-form-footage"
                        value={squareFootageOfHome}
                        onChange={this.handleSquareFootageChange.bind(this)}
                    />
                </FormGroup>

                <FormGroup fieldId="adoption-form-kids">
                    <Checkbox
                        label="I have kids under 16"
                        id="adoption-form-kids"
                        name="adoption-form-kids"
                        aria-label="I have kids under 16"
                        isChecked={kidsUnder16}
                        onChange={this.handleKidsUnder16Change.bind(this)} />
                </FormGroup>

                <FormGroup fieldId="adoption-form-other-animals">
                    <Checkbox
                        label="I own other animals"
                        id="adoption-form-other-animals"
                        name="adoption-form-other-animals"
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
            return (
                <Alert
                    variant="danger"
                    className="popup"
                    title={`The application failed: ${this.state.adoptionError.title}`}
                >
                    {this.state.adoptionError.description}
                </Alert>
            );
        }
        return null;
    }

    private renderAdoptSuccessAlert(): React.ReactNode | null {
        if (this.state.showAdoptSuccessAlert) {
            return <Alert
                variant="success"
                className="popup"
                title="Congratulations! The Adoption application was sent."
            />;
        }
        return null;
    }

    private renderInvalidFormAlert(): React.ReactNode {
        return this.state.showInvalidFormAlert &&
            <Alert
                className="popup"
                variant="danger"
                title="Invalid form"
                action={<AlertActionCloseButton
                    onClose={this.handleCloseInvalidFormAlert.bind(this)}
                />}
            >
                Please complete required fields
            </Alert>;
    }

}


