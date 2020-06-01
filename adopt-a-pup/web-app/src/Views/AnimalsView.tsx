import React from "react";
import { AnimalService } from "../Services/AnimalService";
import { PageSection, PageSectionVariants, Text, TextContent } from "@patternfly/react-core";
import AdoptableAnimalList from "../Components/AdoptableAnimalList";
import { AdoptionService } from "../Services/AdoptionService";


type AnimalsViewProps = {
    animalService: AnimalService;
    adoptionService: AdoptionService;
}


export default class AnimalsView extends React.Component<AnimalsViewProps> {

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
                    <Text component="h2">Create a Shelter</Text>
                    <AdoptableAnimalList
                        animalService={this.props.animalService}
                        adoptionService={this.props.adoptionService}
                    />
                </PageSection>
            </React.Fragment>
        );
    }

}
