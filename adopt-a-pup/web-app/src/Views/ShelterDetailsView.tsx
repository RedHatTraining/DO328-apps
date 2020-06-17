import React from "react";
import { PageSection, PageSectionVariants, Text, TextContent } from "@patternfly/react-core";
import { ShelterService } from "../Services/ShelterService";
import { Shelter } from "../Models/Shelter";
import { AdoptionService } from "../Services/AdoptionService";
import { Animal } from "../Models/Animal";
import AdoptableAnimalList from "../Components/AdoptableAnimalList";
import LoadingData from "../Components/LoadingData";
import { RESTConnectionError } from "../Services/RESTService";

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
    adoptableAnimals: Animal[],
    loading: boolean,
    error: {
        isActive: boolean,
        header: string,
        message: string
    }
}

export default class ShelterDetailsView
    extends React.Component<ShelterDetailsViewProps, ShelterDetailsViewState> {

    constructor(props: ShelterDetailsViewProps) {
        super(props);
        this.state = {
            shelter: undefined,
            adoptableAnimals: [],
            loading: false,
            error: {
                isActive: false,
                header: "",
                message: ""
            }
        };
    }

    public async componentDidMount() {
        const { shelterId } = this.props.match.params;

        this.setState({ loading: true });
        try {
            const [ shelter, adoptableAnimals ] = await Promise.all([
                this.props.shelterService.getById(shelterId),
                this.props.adoptionService.getAdoptableByShelter(shelterId)
            ]);
            this.setState({
                shelter,
                adoptableAnimals
            });
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
        const { shelter, loading, error } = this.state;
        return (
            <LoadingData
                showLoader={loading}
                showError={error.isActive}
                errorTitle={error.header}
                errorDescription={error.message}
                onErrorClosed={this.closeErrorAlert}
            >
                {shelter ? this.renderShelter(shelter) : ""}
            </LoadingData>
        );
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
                    <AdoptableAnimalList animals={this.state.adoptableAnimals} />
                </PageSection>
            </React.Fragment>
        );
    }

}
