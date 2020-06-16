import React from "react";
import { AnimalService } from "../Services/AnimalService";
import {
    PageSection, PageSectionVariants, Text, TextContent, Card, CardBody
} from "@patternfly/react-core";
import AnimalCreateForm from "../Components/AnimalCreateForm";
import {ShelterService} from "../Services/ShelterService";
import { PhotoService } from "../Services/PhotoService";


type AnimalCreateViewProps = {
    animalService: AnimalService;
    shelterService: ShelterService;
    photoService: PhotoService;
}


export default class AnimalCreateView extends React.Component<AnimalCreateViewProps> {

    public render() {
        return (
            <React.Fragment>
                <PageSection variant={PageSectionVariants.light}>
                    <TextContent>
                        <Text component="h1">Animal creation</Text>
                        <Text component="p">Use the following form to create a new animal:</Text>
                    </TextContent>
                </PageSection>
                <PageSection>
                    <Card>
                        <CardBody>
                            <AnimalCreateForm
                                animalService={this.props.animalService}
                                shelterService={this.props.shelterService}
                                photoService={this.props.photoService}
                            />
                        </CardBody>
                    </Card>
                </PageSection>
            </React.Fragment>
        );
    }

}
