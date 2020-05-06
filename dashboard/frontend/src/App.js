import React, {Component} from 'react';
import { Page, PageSection, PageSectionVariants, Text, TextContent, Bullseye } from '@patternfly/react-core'
import ComponentCard from './ComponentCard'

class Dashboard extends Component {
  render() {
    return (
      <Page>
        <PageSection variant={PageSectionVariants.dark}>
          <TextContent>
            <Text style={{textAlign: "center"}} component="h1">Exchange Application Dashboard</Text>
          </TextContent>
        </PageSection>
        <PageSection>
              <Bullseye>
                <ComponentCard endpoint="backend/history" name="History Service"/>
                <ComponentCard endpoint="backend/currencies" name="Currency Service"/>
                <ComponentCard endpoint="backend/exchangeGW" name="Gateway Service"/>
                <ComponentCard endpoint="backend/frontend" name="Frontend Service"/>
              </Bullseye>
        </PageSection>
      </Page>
    );
  }
}

export default Dashboard;
