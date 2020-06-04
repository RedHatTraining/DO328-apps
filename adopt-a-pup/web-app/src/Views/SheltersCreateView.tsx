import React from "react";
import ShelterCreateForm from "../Components/ShelterCreateForm";
import { ShelterService } from "../Services/ShelterService";
import {
    PageSection, PageSectionVariants, Text, TextContent, Card, CardBody
} from "@patternfly/react-core";


type SheltersCreateViewProps = {
    shelterService: ShelterService;
}


export default class SheltersCreateView extends React.Component<SheltersCreateViewProps> {

    public render() {
        return (
            <React.Fragment>
                <PageSection variant={PageSectionVariants.light}>
                    <TextContent>
                        <Text component="h1">Create a Shelter</Text>
                        <Text component="p">Use the following form to create a new shelter:</Text>
                    </TextContent>
                </PageSection>
                <PageSection>
                    <Card>
                        <CardBody>
                            <ShelterCreateForm shelterService={this.props.shelterService} />
                        </CardBody>
                    </Card>
                </PageSection>
            </React.Fragment>
        );
    }

}
