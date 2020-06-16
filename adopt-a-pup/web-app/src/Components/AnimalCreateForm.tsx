import React, { FormEvent } from "react";
import { Animal } from "../Models/Animal";
import { AnimalService } from "../Services/AnimalService";
import {
    ActionGroup,
    Alert,
    AlertActionCloseButton,
    Button,
    ButtonType,
    Checkbox,
    Form,
    FormGroup,
    FormSelect,
    FormSelectOption,
    TextInput,
    Modal
} from "@patternfly/react-core";
import { Residency } from "../Models/Residency";
import { ApproximateSize } from "../Models/ApproximateSize";
import BullseyeSpinner from "./BullseyeSpinner";
import { RESTConnectionError } from "../Services/RESTService";
import { ShelterService } from "../Services/ShelterService";
import { Shelter } from "../Models/Shelter";
import LoadingData from "./LoadingData";
import PhotoGallery from "./PhotoGallery";
import { PhotoService } from "../Services/PhotoService";

type AnimalCreateViewProps = {
    animalService: AnimalService;
    shelterService: ShelterService;
    photoService: PhotoService;
}

type AnimalCreateFormState = {
    showInvalidFormAlert: boolean;
    showSubmitSucessAlert: boolean;
    showSubmitErrorAlert: boolean;
    submitError: {
        title: string,
        description: string
    }
    isSubmitting: boolean;
    isDogPhotoShown: boolean;
    animal: Animal
    shelters: Shelter[],
    loading: boolean,
    error: {
        isActive: boolean,
        header: string,
        message: string
    },
    isPhotoPickerModalOpen: boolean;
    galleryPhotoUrls: string[],
    photoUrl: string
}

export default class AnimalCreateForm
    extends React.Component<AnimalCreateViewProps, AnimalCreateFormState> {

    constructor(props: AnimalCreateViewProps) {
        super(props);
        this.state = {
            showInvalidFormAlert: false,
            showSubmitSucessAlert: false,
            showSubmitErrorAlert: false,
            submitError: {
                title: "",
                description: ""
            },
            isDogPhotoShown: false,
            isSubmitting: false,
            isPhotoPickerModalOpen: false,
            loading: false,
            animal: this.getEmptyFields(),
            shelters: [],
            error: {
                isActive: false,
                header: "",
                message: ""
            },
            galleryPhotoUrls: [],
            photoUrl: ""
        };
    }

    // TODO refactor into common class
    public async componentDidMount() {
        this.setState({ loading: true });

        try {
            const [ shelters, galleryPhotoUrls ] = await Promise.all([
                this.props.shelterService.getAll(),
                this.props.photoService.getAllUrls()
            ]);
            this.setState({ shelters, galleryPhotoUrls });
            // Set default shelter as first option.
            //If we do not do this the form will not know which one is selected by default
            if (shelters[0].shelterId) {
                this.handleShelterIdChange(shelters[0].shelterId);
            }
        } catch (error) {
            if (error instanceof RESTConnectionError) {
                this.showConnectionError(error);
            }
        } finally {
            this.setState({ loading: false });
        }
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


    private handleNameChange(animalName: string) {
        // Immutability: instead of modifying the state,
        // we make a copy with the new value, and then
        // set the new state
        const animal = { ...this.state.animal, animalName };
        this.setState({
            animal
        });
    }

    private handleShelterIdChange(shelterId: string) {
        // Immutability: instead of modifying the state,
        // we make a copy with the new value, and then
        // set the new state
        const animal = { ...this.state.animal, shelterId };
        this.setState({
            animal
        });
    }

    private handleBreedChange(breed: string) {
        // Immutability: instead of modifying the state,
        // we make a copy with the new value, and then
        // set the new state
        const animal = { ...this.state.animal, breed };
        this.setState({
            animal
        });
    }

    private handleApproximateSizeChange(approximateSize: string) {
        // Immutability: instead of modifying the state,
        // we make a copy with the new value, and then
        // set the new state
        const animal = { ...this.state.animal, approximateSize };
        this.setState({
            animal
        });
    }

    private handleResidencyRequiredChange(residencyRequired: string) {
        // Immutability: instead of modifying the state,
        // we make a copy with the new value, and then
        // set the new state
        const animal = { ...this.state.animal, residencyRequired };
        this.setState({
            animal
        });
    }

    private handleWeightChange(weight: string) {
        // Immutability: instead of modifying the state,
        // we make a copy with the new value, and then
        // set the new state
        const animal = {
            ...this.state.animal,
            weight: parseInt(weight)
        };
        this.setState({
            animal
        });
    }

    private handleSquareFootageOfHomeChange(squareFootageOfHome: string) {
        // Immutability: instead of modifying the state,
        // we make a copy with the new value, and then
        // set the new state
        const animal = {
            ...this.state.animal,
            squareFootageOfHome: parseInt(squareFootageOfHome)
        };
        this.setState({
            animal
        });
    }

    private handleChildSafeChange(childSafe: boolean) {
        // Immutability: instead of modifying the state,
        // we make a copy with the new value, and then
        // set the new state
        const animal = { ...this.state.animal, childSafe };
        this.setState({
            animal
        });
    }

    private handleOtherDogSafeChange(otherDogSafe: boolean) {
        // Immutability: instead of modifying the state,
        // we make a copy with the new value, and then
        // set the new state
        const animal = { ...this.state.animal, otherDogSafe };
        this.setState({
            animal
        });
    }

    private handleAdoptableChange(adoptable: boolean) {
        // Immutability: instead of modifying the state,
        // we make a copy with the new value, and then
        // set the new state
        const animal = { ...this.state.animal, adoptable };
        this.setState({
            animal
        });
    }

    private async handleFormSubmit(event: FormEvent) {
        if (this.isFormValid()) {
            this.setState({ isSubmitting: true });
            try {
                // TODO add photo url from state to animal

                await this.props.animalService.create(this.state.animal);
                // const animalId = await this.props.animalService.create(this.state.animal);
                // TODO photo input and then write file to server
                // Maybe have some embedded database like SQLite?

                this.showSuccessAlert();
                this.resetFormFields();
            } catch (error) {
                this.showErrorAlert(error);
            } finally {
                this.setState({ isSubmitting: false });
            }
        } else {
            this.setState({ showInvalidFormAlert: true });
        }
        event.preventDefault();
    }

    private isFormValid() {
        const { animal } = this.state;
        const fieldIsEmpty = (field: string) => { return animal[field as keyof Animal] === ""; };

        const hasEmptyFields = Object
            .keys(animal)
            .some(fieldIsEmpty);
        return !hasEmptyFields;
    }

    private showSuccessAlert() {
        this.setState({
            showSubmitSucessAlert: true,
            showSubmitErrorAlert: false,
            showInvalidFormAlert: false
        });
        this.hideAlertsAfter(3000);
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
            showSubmitSucessAlert: false,
            showInvalidFormAlert: false
        });
        this.hideAlertsAfter(3000);
    }

    private hideAlertsAfter(millis: number) {
        setTimeout(() => {
            this.setState({
                showSubmitSucessAlert: false,
                showSubmitErrorAlert: false,
                submitError: {
                    title: "",
                    description: ""
                }
            });
        }, millis);
    }

    private handleCloseInvalidFormAlert() {
        this.setState({ showInvalidFormAlert: false });
    }

    private handleChoosePhotoButton() {
        this.setState({ isPhotoPickerModalOpen: true });
    }

    private getEmptyFields(): Animal {
        return {
            animalName: "",
            shelterId: "",
            breed: "",
            approximateSize: ApproximateSize.M,
            residencyRequired: Residency.APARTMENT,
            weight: 0,
            adoptable: true,
            squareFootageOfHome: 0,
            childSafe: false,
            otherDogSafe: false,
        };
    }

    private resetFormFields() {
        this.setState({
            animal: this.getEmptyFields()
        });
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
        let state = this.state;
        const { animal, showInvalidFormAlert } = state;
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
                        Please complete required fields
                    </Alert>}
                <FormGroup
                    label="Name"
                    isRequired
                    fieldId="animal-form-name"
                    helperText="Please provide the animal name"
                >
                    <TextInput
                        isRequired
                        type="text"
                        id="animal-form-name"
                        name="animal-form-name"
                        aria-describedby="animal-form-name-helper"
                        value={animal.animalName}
                        onChange={this.handleNameChange.bind(this)}
                    />
                </FormGroup>
                <LoadingData
                    showLoader={state.loading}
                    showError={state.error.isActive}
                    errorTitle={state.error.header}
                    errorDescription={state.error.message}
                    onErrorClosed={this.closeErrorAlert}>
                    <FormGroup
                        label="Shelter"
                        isRequired
                        fieldId="animal-form-shelter-id"

                        helperText="Please provide the shelter"
                    >
                        <FormSelect
                            value={animal.shelterId}
                            onChange={this.handleShelterIdChange.bind(this)}
                            aria-label="Select Shelter">
                            {state.shelters.map(shelter => {
                                return <FormSelectOption
                                    key={shelter.shelterId}
                                    value={shelter.shelterId}
                                    label={shelter.shelterName}
                                />;
                            })}
                        </FormSelect>
                    </FormGroup>
                </LoadingData>
                <FormGroup
                    label="Breed"
                    isRequired
                    fieldId="animal-form-breed"
                    helperText="Please provide the breed"
                >
                    <TextInput
                        isRequired
                        type="text"
                        id="animal-form-breed"
                        name="animal-form-breed"
                        aria-describedby="animal-form-breed-helper"
                        value={animal.breed}
                        onChange={this.handleBreedChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup
                    label="Adoptable"
                    isRequired
                    fieldId="animal-form-adoptable"
                    helperText="Please indicate if animal is adoptable"
                >
                    <Checkbox
                        label="Adoptable?"
                        id="animal-form-adoptable"
                        name="animal-form-adoptable"
                        aria-label="Adoptable?"
                        isChecked={animal.adoptable}
                        onChange={this.handleAdoptableChange.bind(this)} />
                </FormGroup>
                <FormGroup
                    label="Residency"
                    isRequired
                    fieldId="animal-form-residency"
                    helperText="Which type of residency is required">
                    <FormSelect
                        value={animal.residencyRequired}
                        onChange={this.handleResidencyRequiredChange.bind(this)}
                        aria-label="Select Residency">
                        <FormSelectOption
                            key={Residency.HOUSE}
                            value={Residency.HOUSE}
                            label={"House"}
                        />
                        <FormSelectOption
                            key={Residency.APARTMENT}
                            value={Residency.APARTMENT}
                            label={"Apartment"}
                        />
                    </FormSelect>
                </FormGroup>
                <FormGroup
                    label="Approximate Size"
                    isRequired
                    fieldId="animal-form-approximate-size"
                    helperText="Please provide approximate size"
                >
                    <FormSelect
                        value={animal.approximateSize}
                        onChange={this.handleApproximateSizeChange.bind(this)}
                        aria-label="Select approximate size">
                        {Object.keys(ApproximateSize).map((approximateSize) => {
                            return <FormSelectOption
                                key={approximateSize}
                                value={approximateSize}
                                label={approximateSize}
                            />;
                        })}
                    </FormSelect>
                </FormGroup>
                <FormGroup
                    label="Square Footage of Home Required"
                    isRequired fieldId="animal-form-footage"
                >
                    <TextInput
                        isRequired
                        type="number"
                        id="animal-form-footage"
                        name="animal-form-footage"
                        value={animal.squareFootageOfHome}
                        onChange={this.handleSquareFootageOfHomeChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup label="Animal Weight" isRequired fieldId="animal-form-weight">
                    <TextInput
                        isRequired
                        type="number"
                        id="animal-form-weight"
                        name="animal-form-weight"
                        value={animal.weight}
                        onChange={this.handleWeightChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup
                    label="Safe with kids"
                    isRequired
                    fieldId="animal-form-kid-safe"
                    helperText="Please indicate if animal is safe with children under 16"
                >
                    <Checkbox
                        label="Safe with Kids?"
                        id="animal-form-kid-safe"
                        name="animal-form-kid-safe"
                        aria-label="Safe with Kids?"
                        isChecked={animal.childSafe}
                        onChange={this.handleChildSafeChange.bind(this)} />
                </FormGroup>
                <FormGroup
                    label="Safe with other animals"
                    isRequired
                    fieldId="animal-form-animal-safe"
                    helperText="Please indicate if animal is safe with other animals"
                >
                    <Checkbox
                        label="Safe with other Animals?"
                        id="animal-form-animal-safe"
                        name="animal-form-animal-safe"
                        aria-label="Safe with other Animals?"
                        isChecked={animal.otherDogSafe}
                        onChange={this.handleOtherDogSafeChange.bind(this)} />
                </FormGroup>
                <img src={animal.photoUrl} hidden={!this.state.isDogPhotoShown} alt={animal.photoUrl}/>

                <ActionGroup>
                    <Button
                        variant="secondary"
                        onClick={this.handleChoosePhotoButton.bind(this)}>
                        Choose Photo
                    </Button>
                    {this.renderPhotoPickerModal()}
                </ActionGroup>
                <ActionGroup>
                    <Button variant="primary" type={ButtonType.submit}>Create Animal</Button>
                </ActionGroup>
            </Form>
        );
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

    private renderCreationSuccessAlert(): React.ReactNode | null {
        if (this.state.showSubmitSucessAlert) {
            return <Alert
                variant="success"
                title="Animal created"
            />;
        }
        return null;
    }

    private renderPhotoPickerModal() {
        return (
            <Modal
                title="Select a photo"
                isOpen={this.state.isPhotoPickerModalOpen}
                onClose={() => { this.setState({ isPhotoPickerModalOpen: false }); }}
            >
                <PhotoGallery
                    photos={this.state.galleryPhotoUrls}
                    onPhotoSelect={(photoUrl) => {
                        const animal = { ...this.state.animal, photoUrl };
                        this.setState({
                            animal,
                            isPhotoPickerModalOpen: false,
                            isDogPhotoShown: true
                        });
                    }}
                />
            </Modal>
        );

    }
}
