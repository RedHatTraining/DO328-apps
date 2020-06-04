import React from "react";
import { PageSection, PageSectionVariants, Text, TextContent } from "@patternfly/react-core";
import { ShelterService } from "../Services/ShelterService";
import { Shelter } from "../Models/Shelter";
import { AdoptionService } from "../Services/AdoptionService";
import { Animal } from "../Models/Animal";
import AdoptableAnimalList from "../Components/AdoptableAnimalList";

type ShelterDetailsViewProps = {
    shelterService: ShelterService;
    adoptionService: AdoptionService;
    match: {
        params: {
            shelterId: string
        }
    }
}

type ShelterDetailsViewState = {
    shelter?: Shelter,
    adoptableAnimals: Animal[]
}

export default class ShelterDetailsView
    extends React.Component<ShelterDetailsViewProps, ShelterDetailsViewState> {

    constructor(props: ShelterDetailsViewProps) {
        super(props);
        this.state = {
            shelter: undefined,
            adoptableAnimals: []
        };
    }


    public async componentDidMount() {
        const { shelterId } = this.props.match.params;
        const [ shelter, adoptableAnimals ] = await Promise.all([
            this.props.shelterService.getById(shelterId),
            this.props.adoptionService.getAdoptableByShelter(shelterId)
        ]);
        this.setState({
            shelter,
            adoptableAnimals
        });
    }

    public render() {
        const { shelter } = this.state;
        return shelter ? this.renderShelter(shelter) : this.renderMissingShelter();
    }

    private renderShelter(shelter: Shelter) {
        return (
            <React.Fragment>
                <PageSection variant={PageSectionVariants.light}>
                    <TextContent>
                        <Text component="h1">
                            {shelter.shelterName}
                        </Text>
                        <Text component="p">
                            <strong>Name: </strong>{shelter.shelterName}
                        </Text>
                        <Text component="p">
                            <strong>State: </strong>{shelter.state}
                        </Text>
                        <Text component="p">
                            <strong>Country: </strong>{shelter.country}
                        </Text>
                        <Text component="p">
                            <strong>Address: </strong>{shelter.address}
                        </Text>
                        <Text component="p">
                            <strong>Email: </strong>{shelter.email}
                        </Text>
                        <Text component="p">
                            <strong>Phone Number: </strong>{shelter.phoneNumber}
                        </Text>
                    </TextContent>
                </PageSection>
                <PageSection>
                    <TextContent>
                        <Text component="h1">
                            Adoptable Animals
                        </Text>
                    </TextContent>
                    <AdoptableAnimalList animals={this.state.adoptableAnimals}></AdoptableAnimalList>
                </PageSection>
            </React.Fragment>
        );
    }

    private renderMissingShelter() {
        return (
            <PageSection variant={PageSectionVariants.light}>
                <TextContent>
                    <Text component="h1">Not Found</Text>
                    <Text component="p">
                        This shelter does not exist.
                    </Text>
                </TextContent>
            </PageSection>
        );
    }

}