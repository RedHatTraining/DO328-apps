import React from "react";
import { PageSection, PageSectionVariants, Text, TextContent, GridItem, Grid } from "@patternfly/react-core";
import { AdoptionService } from "../Services/AdoptionService";
import { AnimalService } from "../Services/AnimalService";
import { Animal } from "../Models/Animal";
import AdoptionForm from "../Components/AdoptionForm";

type AnimalDetailsViewProps = {
    adoptionService: AdoptionService;
    animalService: AnimalService;
}

type AnimalDetailsViewState = {
    animal?: Animal
}

export default class AnimalDetailsView
    extends React.Component<AnimalDetailsViewProps, AnimalDetailsViewState> {

    constructor(props: AnimalDetailsViewProps) {
        super(props);
        this.state = {
            animal: undefined
        };
    }


    public async componentDidMount() {
        const { animalId } = this.props.match.params;
        const animal = await this.props.animalService.getById(animalId);
        this.setState({
            animal
        });
    }

    public render() {
        const { animal } = this.state;
        return animal ? this.renderAnimal(animal) : this.renderMissingAnimal();
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
                            <img src={`/photos/${animal.animalId}.jpeg`}  />
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
                                    <strong>Residency Required: </strong>
                                    {animal.residencyRequired ? "Yes" : "No"}
                                </Text>
                                <Text component="p">
                                    <strong>Residency Required: </strong>
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
                    <AdoptionForm adoptionService={this.props.adoptionService} animalId={animal.animalId} />
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