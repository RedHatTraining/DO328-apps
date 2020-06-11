import React from "react";
import {PageSection, PageSectionVariants, Text, TextContent} from "@patternfly/react-core";
import NotificationRequestForm from "../Components/NotificationRequestForm";
import {AnimalService} from "../Services/AnimalService";

type NotificationsViewProps = {
    animalService: AnimalService;
}

export default class NotificationsView extends React.Component<NotificationsViewProps> {
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
                    <NotificationRequestForm animalService={this.props.animalService}/>
                </PageSection>
            </React.Fragment>
        );
    }
}