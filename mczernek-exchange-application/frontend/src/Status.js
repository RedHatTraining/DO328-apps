import React, { Component } from 'react';

import { List, ListItem } from '@patternfly/react-core';

export default class Status extends Component {

    constructor(props) {
        super(props);

        this.state = {
            service1: false,
            service2: false,
            service3: false
        };
    }

    testService1() {
        const timeout = (time, promise) => {
            return new Promise(function (resolve, reject) {
                setTimeout(() => {
                    reject(new Error('Request timed out.'))
                }, time);
                promise.then(resolve, reject);
            });
        }
        const controller = new AbortController();
        const signal = controller.signal;

        timeout(3000, fetch('http://localhost:8080', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ src: "EUR", target: "USD" }),
            signal: signal
        }))
            .then(data => data = data.json())
            .then(this.setState({ service1: true }))
            .catch(err => {
                console.log(err);
                controller.abort();
            })

    }

    testService2() {

    }

    componentDidMount() {
        this.testService1()
    }

    render() {
        const { service1, service2, service3 } = this.state;
        console.log(service1)
        return (
            <List>
                <ListItem>Service 1 - {service1 ? "OK" : "NOK"} </ListItem>
                <ListItem>Service 2 - {service2 ? "OK" : "NOK"}</ListItem>
                <ListItem>Service 3 - {service3 ? "OK" : "NOK"}</ListItem>
            </List>
        )
    }
}