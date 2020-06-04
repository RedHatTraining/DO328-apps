import React, {FormEvent} from "react";
import {Animal} from "../Models/Animal";
import {AnimalService} from "../Services/AnimalService"
import {
    Form,
    FormGroup,
    TextInput,
    FormSelect,
    Checkbox,
    FormSelectOption
} from "@patternfly/react-core";
import {Residency} from "../Models/Residency";
import {ApproximateSize} from "../Models/ApproximateSize";

type AnimalCreateViewProps = {
    animalService: AnimalService;
}

type AnimalCreateFormState = {
    animal: Animal
}

export default class AnimalCreateForm extends React.Component<AnimalCreateViewProps, AnimalCreateFormState> {
    constructor(props: AnimalCreateViewProps) {
        super(props);
        this.state = {
            animal: {
                animalName: "",
                shelterId: "",
                breed: "",
                approximateSize: "",
                residencyRequired: "APARTMENT",
                weight: 0,
                adoptable: true,
                squareFootageOfHome: 0,
                childSafe: false,
                otherDogSafe: false
            }
        }
    }

    private async handleFormSubmit(event: FormEvent) {
        const {animal} = this.state;
        const animalId = this.props.animalService.create(animal);
        // TODO photo input and then write file to server 
        // Maybe have some embedded database like SQLite?
        event.preventDefault();
    }

    private handleNameChange(name: string) {
        this.state.animal.animalName = name;
    }

    private handleShelterIdChange(shelterId: string) {
        this.state.animal.shelterId = shelterId;
    }

    private handleBreedChange(breed: string) {
        this.state.animal.breed = breed;
    }

    private handleApproximateSizeChange(approximateSize: string) {
        this.state.animal.approximateSize = approximateSize;
    }

    private handleResidencyRequiredChange(residencyRequired: string) {
        this.state.animal.residencyRequired = residencyRequired;
    }

    private handleWeightChange(weight: number) {
        this.state.animal.weight = weight;
    }

    private handleSquareFootageOfHomeChange(squareFootageOfHome: number) {
        this.state.animal.squareFootageOfHome = squareFootageOfHome;
    }

    private handleChildSafeChange(childSafe: boolean) {
        this.state.animal.childSafe = childSafe;
    }

    private handleOtherDogSafeChange(otherDogSafe: boolean) {
        this.state.animal.otherDogSafe = otherDogSafe;
    }

    private handleAdoptableChange(adoptable: boolean) {
        this.state.animal.adoptable = adoptable
    }

    public render() {
        const {animal} = this.state;
        return (
            <Form onSubmit={this.handleFormSubmit.bind(this)}>
                <FormGroup
                    label="Name"
                    isRequired
                    fieldId="simple-form-name"
                    helperText="Please provide the animal name"
                >
                    <TextInput
                        isRequired
                        type="text"
                        id="simple-form-name"
                        name="simple-form-name"
                        aria-describedby="simple-form-name-helper"
                        value={animal.animalName}
                        onChange={this.handleNameChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup
                    label="Shelter ID"
                    isRequired
                    fieldId="simple-form-shelter-id"
                    helperText="Please provide the shelter ID"
                >
                    <TextInput
                        isRequired
                        type="text"
                        id="simple-form-name"
                        name="simple-form-shelter-id"
                        aria-describedby="simple-form-shelter-id-helper"
                        value={animal.shelterId}
                        onChange={this.handleShelterIdChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup
                    label="Breed"
                    isRequired
                    fieldId="simple-form-breed"
                    helperText="Please provide the breed"
                >
                    <TextInput
                        isRequired
                        type="text"
                        id="simple-form-breed"
                        name="simple-form-breed"
                        aria-describedby="simple-form-breed-helper"
                        value={animal.breed}
                        onChange={this.handleBreedChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup
                    label="Adoptable"
                    isRequired
                    fieldId="simple-form-adoptable"
                    helperText="Please indicate if animal is adoptable"
                >
                    <Checkbox
                        label="Adoptable?"
                        id="simple-form-adoptable"
                        name="simple-form-adoptable"
                        aria-label="Adoptable?"
                        isChecked={true}
                        onChange={this.handleAdoptableChange.bind(this)}/>
                </FormGroup>
                <FormGroup
                    label="Residency"
                    isRequired
                    fieldId="simple-form-residency"
                    helperText="Which type of residency is required">
                    <FormSelect
                        value={animal.residencyRequired}
                        onChange={(residency) => this.handleResidencyRequiredChange.bind(this)}
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
                    fieldId="simple-form-approximate-size"
                    helperText="Please provide approximate size"
                >
                    <FormSelect
                        value={animal.approximateSize}
                        onChange={(residency) => this.handleApproximateSizeChange.bind(this)}
                        aria-label="Select approximate size">
                        <FormSelectOption
                            key={ApproximateSize.S}
                            value={ApproximateSize.S}
                            label={ApproximateSize.S}
                        />
                        <FormSelectOption
                            key={ApproximateSize.M}
                            value={ApproximateSize.M}
                            label={ApproximateSize.M}
                        />
                        <FormSelectOption
                            key={ApproximateSize.L}
                            value={ApproximateSize.L}
                            label={ApproximateSize.L}
                        />
                    </FormSelect>
                </FormGroup>
                <FormGroup label="Square Footage of Home Required" isRequired fieldId="simple-form-footage">
                    <TextInput
                        isRequired
                        type="number"
                        id="simple-form-footage"
                        name="simple-form-footage"
                        value={animal.squareFootageOfHome}
                        onChange={() => this.handleSquareFootageOfHomeChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup label="Animal Weight" isRequired fieldId="simple-form-weight">
                    <TextInput
                        isRequired
                        type="number"
                        id="simple-form-weight"
                        name="simple-form-weight"
                        value={animal.weight}
                        onChange={() => this.handleWeightChange.bind(this)}
                    />
                </FormGroup>
                <FormGroup
                    label="safe with kids"
                    isRequired
                    fieldId="simple-form-kid-safe"
                    helperText="Please indicate if animal is safe with children under 16"
                >
                    <Checkbox
                        label="Safe with Kids?"
                        id="simple-form-kid-safe"
                        name="simple-form-kid-safe"
                        aria-label="Safe with Kids?"
                        isChecked={false}
                        onChange={this.handleChildSafeChange.bind(this)}/>
                </FormGroup>
                <FormGroup
                    label="safe with other animals"
                    isRequired
                    fieldId="simple-form-animal-safe"
                    helperText="Please indicate if animal is safe with other animals"
                >
                    <Checkbox
                        label="Safe with other Animals?"
                        id="simple-form-animal-safe"
                        name="simple-form-animal-safe"
                        aria-label="Safe with other Animals?"
                        isChecked={false}
                        onChange={this.handleOtherDogSafeChange.bind(this)}/>
                </FormGroup>
            </Form>
        )
    }
}