import React, { Component } from 'react';
import rhtLogo from './training_black.png'

import { TextContent, Text } from '@patternfly/react-core'

export default class WelcomePage extends Component {
    render() {
        return (
            <TextContent>
                <Text component="h1" className="centered">
                    <b>Welcome to the currency exchange application of DO328!</b>
                </Text>
                <div className="centered">
                    <img src={rhtLogo} alt="Red Hat Training Logo" />
                </div>
                <Text component="p">
                    Please choose one of the two links on the left:
                </Text>
                <ul>
                    <li>Historical data for seeing currency's exchange rate in time</li>
                    <li>Exchange for seeing how much money is your amount worth in a different currency</li>
                </ul>
                <Text component="p">
                    For detailed info about the structure of this application, see the 
                    <Text component="a" href="https://github.com/RedHatTraining/DO328-apps/" >
                        DO328-apps
                    </Text> repository.
                </Text>
                <Text component="p">
                    You can ask questions or file issues <Text component="a" href="https://github.com/RedHatTraining/DO328-apps/issues">here</Text>.
                </Text>
            </TextContent>

        )
    }
}
