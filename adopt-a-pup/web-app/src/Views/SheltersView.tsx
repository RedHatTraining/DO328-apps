import React from "react";
import ShelterCreateForm from "../Components/ShelterCreateForm";
import ShelterList from "../Components/SheltersList";
import { ShelterService } from "../Services/ShelterService";
import { PageSection, PageSectionVariants, Text, TextContent, Card } from "@patternfly/react-core";


type SheltersViewProps = {
    shelterService: ShelterService;
}


export default class SheltersView extends React.Component<SheltersViewProps> {

    public render() {
        return (
            <React.Fragment>
                <PageSection variant={PageSectionVariants.light}>
                    <TextContent>
                        <Text component="h1">Shelters</Text>
                        <Text component="p">Our shelters</Text>
                    </TextContent>
                </PageSection>
                <PageSection>
                    <ShelterList shelterService={this.props.shelterService}></ShelterList>
                </PageSection>
                <PageSection variant={PageSectionVariants.light}>
                    <Card>
                        <Text component="h2">Create a Shelter</Text>
                        <ShelterCreateForm shelterService={this.props.shelterService}></ShelterCreateForm>
                    </Card>
                </PageSection>
            </React.Fragment>
        );
    }

}
