import React, {Component} from "react";
import { Page, PageSection, PageSectionVariants, Text, TextContent, Bullseye } from "@patternfly/react-core";
import ComponentCard from "./ComponentCard";

class Dashboard extends Component {
  render() {
    return (
      <Page>
        <PageSection className="border-top-blue center" variant={PageSectionVariants.dark}>
          <TextContent>
            <Text component="h1">Exchange Application Dashboard</Text>
          </TextContent>
        </PageSection>
        <PageSection>
          <Bullseye>
            <ComponentCard endpoint="history" name="History Service"/>
            <ComponentCard endpoint="currencies" name="Currency Service"/>
            <ComponentCard endpoint="exchangeGW" name="Gateway Service"/>
            <ComponentCard endpoint="frontend" name="Frontend Service"/>
          </Bullseye>
        </PageSection>
      </Page>
    );
  }
}

export default Dashboard;
