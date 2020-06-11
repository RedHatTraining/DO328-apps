import React from "react";
import { PageSection, PageSectionVariants, Text, TextContent } from "@patternfly/react-core";
import PhotoGallery from "../Components/PhotoGallery";



export default class HomeView extends React.Component {

    public render() {
        return (
            <PageSection variant={PageSectionVariants.light}>
                <TextContent>
                    <Text component="h1">Adopt a Pup</Text>
                    <Text component="p">
                        Hello! This is the main page to adopt a pup.
                    </Text>
                </TextContent>
                <PhotoGallery
                    photos={["photos/a89cd4fc-16ce-4b51-8dd1-866d7d793322.jpeg", "photos/aac7ea0a-2374-4d4b-8d3a-71e4f896e751.jpeg"]} 
                    selectedPhotoIndex={1} onPhotoSelect={() =>{}}
                />
            </PageSection>
        );
    }

}
