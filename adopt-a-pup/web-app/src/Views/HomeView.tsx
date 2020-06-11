import React from "react";
import { PageSection, PageSectionVariants, Text, TextContent } from "@patternfly/react-core";


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
            </PageSection>
        );
    }

}
