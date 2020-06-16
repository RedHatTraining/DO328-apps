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
                        <Text component="h1">Subscribe to Email Notifications</Text>
                        <Text component="h3">Setup notifications for animals that meet your criteria</Text>
                    </TextContent>
                </PageSection>
                <PageSection>
                    <NotificationRequestForm animalService={this.props.animalService}/>
                </PageSection>
            </React.Fragment>
        );
    }
}
