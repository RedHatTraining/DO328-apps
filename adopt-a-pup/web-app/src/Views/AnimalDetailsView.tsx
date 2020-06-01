import React from "react";
import { PageSection, PageSectionVariants, Text, TextContent } from "@patternfly/react-core";
import { AdoptionService } from "../Services/AdoptionService";
import { AnimalService } from "../Services/AnimalService";

type AnimalDetailsViewProps = {
    adoptionService: AdoptionService;
    animalService: AnimalService;
}

export default class AnimalDetailsView extends React.Component<AnimalDetailsViewProps, AnimalService> {
    public render() {
        return (
            <PageSection variant={PageSectionVariants.light}>

            </PageSection>
        )
    }
}