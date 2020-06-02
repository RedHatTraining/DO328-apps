import React from "react";
import { AnimalService } from "../Services/AnimalService";
import { PageSection, PageSectionVariants, Text, TextContent } from "@patternfly/react-core";
import AdoptableAnimalList from "../Components/AdoptableAnimalList";
import { AdoptionService } from "../Services/AdoptionService";
import { Animal } from "../Models/Animal";


type AnimalsViewProps = {
    animalService: AnimalService;
    adoptionService: AdoptionService;
}

type AnimalsViewState = {
    animals: Animal[]
}


export default class AnimalsView extends React.Component<AnimalsViewProps, AnimalsViewState> {

    constructor(props: AnimalsViewProps) {
        super(props);
        this.state = {
            animals: []
        };
    }

    public async componentDidMount() {
        const animals = await this.props.animalService.getAllAdoptable();
        this.setState({
            animals
        });
    }

    public render() {
        return (
            <React.Fragment>
                <PageSection variant={PageSectionVariants.light}>
                    <TextContent>
                        <Text component="h1">Animals</Text>
                        <Text component="p">
                            These animals are waiting for you!
                        </Text>
                    </TextContent>
                </PageSection>
                <PageSection>
                    <Text component="h2">Adoptable Animals</Text>
                    <AdoptableAnimalList animals={this.state.animals} />
                </PageSection>
            </React.Fragment>
        );
    }

}
