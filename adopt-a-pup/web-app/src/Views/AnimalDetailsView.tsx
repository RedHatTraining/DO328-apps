import React from "react";
import {
    PageSection, PageSectionVariants, Text, TextContent, GridItem, Grid
} from "@patternfly/react-core";
import { AdoptionService } from "../Services/AdoptionService";
import { AnimalService } from "../Services/AnimalService";
import { Animal } from "../Models/Animal";
import AdoptionForm from "../Components/AdoptionForm";
import { RESTConnectionError } from "../Services/RESTService";
import LoadingData from "../Components/LoadingData";

type AnimalDetailsViewProps = {
    adoptionService: AdoptionService;
    animalService: AnimalService;
    match: {
        params: {
            animalId: string
        }
    }
}

type AnimalDetailsViewState = {
    animal?: Animal,
    loading: boolean,
    error: {
        isActive: boolean,
        header: string,
        message: string
    }
}

export default class AnimalDetailsView
    extends React.Component<AnimalDetailsViewProps, AnimalDetailsViewState> {

    constructor(props: AnimalDetailsViewProps) {
        super(props);
        this.state = {
            animal: undefined,
            loading: false,
            error: {
                isActive: false,
                header: "",
                message: ""
            }
        };
    }

    public async componentDidMount() {
        const { animalId } = this.props.match.params;
        this.setState({ loading: true });

        try {
            const animal = await this.props.animalService.getById(animalId);
            this.setState({ animal });
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

    public render() {
        const { animal, loading, error } = this.state;
        return (
            <LoadingData
                showLoader={loading}
                showError={error.isActive}
                errorTitle={error.header}
                errorDescription={error.message}
                onErrorClosed={this.closeErrorAlert}
                title="Adoptable Animals"
            >
                {animal ? this.renderAnimal(animal) : ""}
            </LoadingData>
        );
    }

    private renderAnimal(animal: Animal) {
        return (
            <React.Fragment>
                <PageSection variant={PageSectionVariants.light}>
                    <TextContent>
                        <Text component="h1">{animal.animalName}</Text>
                    </TextContent>
                    <Grid>
                        <GridItem span={4}>
                            <img
                                // src={`/frontend/photos/${animal.animalId}.jpeg`}
                                src={animal.photoUrl}
                                alt={animal.animalName}
                            />
                        </GridItem>
                        <GridItem span={8}>
                            <TextContent>
                                <Text component="p">
                                    <strong>Name: </strong>{animal.animalName}
                                </Text>
                                <Text component="p">
                                    <strong>Breed: </strong>{animal.breed}
                                </Text>
                                <Text component="p">
                                    <strong>Weight: </strong>{animal.weight}
                                </Text>
                                <Text component="p">
                                    <strong>Approximate Size: </strong>{animal.approximateSize}
                                </Text>
                                <Text component="p">
                                    <strong>Child Safe: </strong>
                                    {animal.childSafe ? "Yes" : "No"}
                                </Text>
                                <Text component="p">
                                    <strong>Other Dogs Safe: </strong>
                                    {animal.otherDogSafe ? "Yes" : "No"}
                                </Text>
                                <Text component="p">
                                    <strong>House Required: </strong>
                                    {animal.residencyRequired ? "Yes" : "No"}
                                </Text>
                                <Text component="p">
                                    <strong>Square Footage of Home: </strong>
                                    {animal.squareFootageOfHome}
                                </Text>
                            </TextContent>
                        </GridItem>
                    </Grid>
                </PageSection>
                <PageSection>
                    <TextContent>
                        <Text component="h2">Adopt {animal.animalName}!</Text>
                    </TextContent>
                    {/*TODO do better here*/}
                    <AdoptionForm
                        adoptionService={this.props.adoptionService}
                        animalId={animal.animalId ? animal.animalId : ""}
                    />
                </PageSection>
            </React.Fragment>
        );
    }

    private renderMissingAnimal() {
        return (
            <PageSection variant={PageSectionVariants.light}>
                <TextContent>
                    <Text component="h1">Not Found</Text>
                    <Text component="p">
                        This animal does not exist.
                    </Text>
                </TextContent>
            </PageSection>
        );

    }

}
