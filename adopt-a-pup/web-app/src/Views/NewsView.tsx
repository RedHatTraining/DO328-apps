import React from "react";
import { PageSection, PageSectionVariants, TextContent, Text } from "@patternfly/react-core";
import { NewsService } from "../Services/NewsService";
import NewsBoard from "../Components/NewsBoard";


type NewsViewProps = {
    newsService: NewsService;
}


export default class NewsView extends React.Component<NewsViewProps> {

    public render() {

        return (
            <React.Fragment>
                <PageSection variant={PageSectionVariants.light}>
                    <TextContent>
                        <Text component="h1">Animal News</Text>
                        <Text component="p">
                            Latest animal news!
                        </Text>
                    </TextContent>
                </PageSection>
                <PageSection>
                    <NewsBoard newsService={this.props.newsService}></NewsBoard>
                </PageSection>
            </React.Fragment>
        );
    }

}
