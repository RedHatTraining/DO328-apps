import {AnimalService} from "../Services/AnimalService";
import React, {FormEvent} from "react";
import {
    ActionGroup,
    Alert,
    AlertActionCloseButton, Button, ButtonType,
    Form,
    FormGroup,
    FormSelect,
    FormSelectOption,
    TextInput
} from "@patternfly/react-core";
import {AnimalNotificationRequest} from "../Models/AnimalNotificationRequest";
import {ApproximateSize} from "../Models/ApproximateSize";
import BullseyeSpinner from "./BullseyeSpinner";
import {RESTConnectionError} from "../Services/RESTService";

type NotificationRequestFormProps = {
    animalService: AnimalService;
}

type NotificationRequestFormState = {
    notificationRequest: AnimalNotificationRequest;
    showInvalidFormAlert: boolean;
    showSubmitSuccessAlert: boolean;
    showSubmitErrorAlert: boolean;
    submitError: {
        title: string,
        description: string
    }
    isSubmitting: boolean;
    loading: boolean,
    error: {
        isActive: boolean,
        header: string,
        message: string
    }
}

export default class NotificationRequestForm
    extends React.Component<NotificationRequestFormProps, NotificationRequestFormState> {

    constructor(props: NotificationRequestFormProps) {
        super(props);
        this.state = {
            notificationRequest: NotificationRequestForm.getEmptyFields(),
            showInvalidFormAlert: false,
            showSubmitSuccessAlert: false,
            showSubmitErrorAlert: false,
            submitError: {
                title: "",
                description: ""
            },
            isSubmitting: false,
            loading: false,
            error: {
                isActive: false,
                header: "",
                message: ""
            }
        };
    }

    private static getEmptyFields(): AnimalNotificationRequest {
        return {
            username: "",
            email: "",
            breed: "",
            minWeight: 0,
            maxWeight: 200,
            approximateSize: ApproximateSize.S
        };
    }

    private resetFormFields() {
        this.setState({
            notificationRequest: NotificationRequestForm.getEmptyFields()
        });
    }

    public renderLoader() {
        return <BullseyeSpinner/>;
    }

    public render() {
        return (
            <React.Fragment>
                {this.state.isSubmitting ? this.renderLoader() : this.renderForm()}
            </React.Fragment>
        );
    }

    public renderForm() {
        let notificationRequest = this.state.notificationRequest;
        return (
            <Form onSubmit={this.handleFormSubmit.bind(this)}>
                {this.renderCreationSuccessAlert()}
                {this.renderCreationErrorAlert()}
                {this.state.showInvalidFormAlert &&
                <Alert
                    id="myalert"
                    className="popup"
                    variant="danger"
                    title="Invalid form"
                    action={<AlertActionCloseButton
                        onClose={this.handleCloseInvalidFormAlert.bind(this)}
                    />}>
                    Please complete required fields
                </Alert>}
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
                        value={notificationRequest.username}
                        onChange={this.handleNameChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup label="Email" isRequired fieldId="adoption-form-email">
                    <TextInput
                        isRequired
                        type="email"
                        id="adoption-form-email"
                        name="adoption-form-email"
                        value={notificationRequest.email}
                        onChange={this.handleEmailChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup
                    label="Breed"
                    fieldId="animal-form-breed"
                    helperText="Please provide the breed"
                >
                    <TextInput
                        type="text"
                        id="animal-form-breed"
                        name="animal-form-breed"
                        aria-describedby="animal-form-breed-helper"
                        value={notificationRequest.breed}
                        onChange={this.handleBreedChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup label="Animal Minimum Weight" isRequired fieldId="animal-form-min-weight">
                    <TextInput
                        isRequired
                        type="number"
                        id="animal-form-min-weight"
                        name="animal-form-min-weight"
                        value={notificationRequest.minWeight}
                        onChange={this.handleMinWeightChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup label="Animal Maximum Weight" isRequired fieldId="animal-form-max-weight">
                    <TextInput
                        isRequired
                        type="number"
                        id="animal-form-max-weight"
                        name="animal-form-max-weight"
                        value={notificationRequest.maxWeight}
                        onChange={this.handleMaxWeightChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup
                    label="Approximate Size"
                    fieldId="animal-form-approximate-size"
                    helperText="Please provide approximate size"
                >
                    <FormSelect
                        value={notificationRequest.approximateSize}
                        onChange={this.handleApproximateSizeChange.bind(this)}
                        aria-label="Select approximate size">
                        <FormSelectOption label={"None"}
                            value={null}
                            key={"None"}/>
                        {Object.keys(ApproximateSize).map((approximateSize) => {
                            return <FormSelectOption
                                key={approximateSize}
                                value={approximateSize}
                                label={approximateSize}
                            />;
                        })}
                    </FormSelect>
                </FormGroup>
                <ActionGroup>
                    <Button variant="primary" type={ButtonType.submit}>Subscribe</Button>
                </ActionGroup>
            </Form>
        );
    }

    private handleNameChange(username: string) {
        // Immutability: instead of modifying the state,
        // we make a copy with the new value, and then
        // set the new state
        const notificationRequest = {...this.state.notificationRequest, username};
        this.setState({
            notificationRequest
        });
    }

    private handleBreedChange(breed: string) {
        // Immutability: instead of modifying the state,
        // we make a copy with the new value, and then
        // set the new state
        const notificationRequest = {...this.state.notificationRequest, breed};
        this.setState({
            notificationRequest
        });
    }

    private handleEmailChange(email: string) {
        // Immutability: instead of modifying the state,
        // we make a copy with the new value, and then
        // set the new state
        const notificationRequest = { ...this.state.notificationRequest, email };
        this.setState({
            notificationRequest
        });
    }

    private handleApproximateSizeChange(approximateSize: string) {
        // Immutability: instead of modifying the state,
        // we make a copy with the new value, and then
        // set the new state
        const notificationRequest = {...this.state.notificationRequest, approximateSize};
        this.setState({
            notificationRequest
        });
    }

    private handleMinWeightChange(minWeight: string) {
        // Immutability: instead of modifying the state,
        // we make a copy with the new value, and then
        // set the new state
        const notificationRequest = {
            ...this.state.notificationRequest,
            weight: parseInt(minWeight)
        };
        this.setState({
            notificationRequest
        });
    }

    private handleMaxWeightChange(maxWeight: string) {
        // Immutability: instead of modifying the state,
        // we make a copy with the new value, and then
        // set the new state
        const notificationRequest = {
            ...this.state.notificationRequest,
            weight: parseInt(maxWeight)
        };
        this.setState({
            notificationRequest
        });
    }

    private renderCreationErrorAlert(): React.ReactNode | null {
        if (this.state.showSubmitErrorAlert) {
            return (
                <Alert
                    variant="danger"
                    title={`Error creating animal: ${this.state.submitError.title}`}
                >
                    {this.state.submitError.description}
                </Alert>
            );
        }
        return null;
    }

    private showErrorAlert(error: Error) {
        let submitError = {
            title: error.name,
            description: error.message
        };
        if (error instanceof RESTConnectionError) {
            submitError.description = error.description;
        }
        this.setState({
            showSubmitErrorAlert: true,
            submitError,
            showSubmitSuccessAlert: false,
            showInvalidFormAlert: false
        });
        this.hideAlertsAfter(3000);
    }

    private hideAlertsAfter(millis: number) {
        setTimeout(() => {
            this.setState({
                showSubmitSuccessAlert: false,
                showSubmitErrorAlert: false,
                submitError: {
                    title: "",
                    description: ""
                }
            });
        }, millis);
    }
    private async handleFormSubmit(event: FormEvent) {
        if (this.isFormValid()) {
            this.setState({isSubmitting: true});
            try {
                await this.props.animalService.subscribeNotifications(this.state.notificationRequest);
                // const animalId = await this.props.animalService.create(this.state.animal);
                // TODO photo input and then write file to server
                // Maybe have some embedded database like SQLite?

                this.showSuccessAlert();
                this.resetFormFields();
            } catch (error) {
                this.showErrorAlert(error);
            } finally {
                this.setState({isSubmitting: false});
            }
        } else {
            this.setState({showInvalidFormAlert: true});
        }
        event.preventDefault();
    }

    private isFormValid() {
        const {notificationRequest} = this.state;
        const fieldIsEmpty = (field: string) => notificationRequest[field as keyof AnimalNotificationRequest] === "";

        const hasEmptyFields = Object
            .keys(notificationRequest)
            .some(fieldIsEmpty);

        return !hasEmptyFields;
    }


    private showConnectionError(error: RESTConnectionError) {
        this.setState({
            error: {
                isActive: true,
                header: error.message,
                message: error.description,
            }
        });
    }

    private closeErrorAlert = () => {
        this.setState({
            error: {
                isActive: false,
                message: "",
                header: ""
            }
        });
    }

    private showSuccessAlert() {
        this.setState({
            showSubmitSuccessAlert: true,
            showSubmitErrorAlert: false,
            showInvalidFormAlert: false
        });
        this.hideAlertsAfter(3000);
    }

    private handleCloseInvalidFormAlert() {
        this.setState({showInvalidFormAlert: false});
    }

    private renderCreationSuccessAlert(): React.ReactNode | null {
        if (this.state.showSubmitSuccessAlert) {
            return <Alert
                variant="success"
                title="Notification Subscription Created"
            />;
        }
        return null;
    }
}
