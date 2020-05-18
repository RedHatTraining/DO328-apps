import React, { Component } from 'react';
import {
    Alert, 
    AlertActionCloseButton,
    Form,
    FormGroup,
    FormSelect,
    FormSelectOption,
    Button,
    TextContent,
    Text,
    Flex,
    FlexItem,
} from '@patternfly/react-core';

import Spinner from './Loading';
import RenderedChart from './Graph'
import FetchUtils from './FetchUtils'


class CurrencyPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            currencies: [],
            src: 'Loading currencies',
            target: 'Loading currencies',
            exchangeData: '',
            requestExchangeData: false,
            inputValue: 1,
            inputValid: true,
            error: {
                isActive: false,
            }
        };
    }

    componentDidMount() {
        this.setState({
            loading: true
        })

        this.getCurrencies()
    }

    getCurrencies = () => {
        FetchUtils.fetchWithRetry(`http://${process.env.REACT_APP_GW_ENDPOINT}/currencies`)
            .then(currencies => currencies.json())
            .then(currencies => this.setState({
                currencies, src: currencies[0], target: currencies[1], loading: false
            }))
            .catch(err => {
                console.log(err);
                this.setState({
                    error: {
                        isActive: true,
                        header: "Fetching currencies failed",
                        message: `Got the following error trying to fetch currencies: ${err}`,
                    }
                })
            });
    }

    onChangeSrc = (src) => {
        this.setState({ src });
    };

    onChangeTarget = (target) => {
        this.setState({ target });
    };

    onChangeInput = (inputValue) => {
        const inputValid = this.inputValidation(inputValue);
        this.setState({ inputValue, inputValid });
    }

    inputValidation = (input) => {
        return input > 0
    }

    submit = (e) => {
        e.preventDefault();
        this.setState({ requestExchangeData: true })

        const payload = {
            source: this.state.src,
            target: this.state.target
        }
        FetchUtils.fetchWithRetry(`http://${process.env.REACT_APP_GW_ENDPOINT}/exchangeRate/historicalData`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(exchangeData => exchangeData.json().then(exchangeData => this.setState({exchangeData})))
        .catch(err => {
            console.log(err)
            this.setState({
                error: {
                    isActive: true,
                    header: "Fetching exchange rate failed",
                    message: `Got the following error trying to fetch currencies: ${err}`,
                },
                requestExchangeData: false
            })
        })
    };

    closeAlert = () => {
        this.setState({
            error: {
                isActive: false,
            }
        })
    }

    render() {
        const { exchangeData, requestExchangeData, error } = this.state;

        return (
            <React.Fragment>
                 {error.isActive && 
                    <Alert
                        className="popup"
                        variant="danger"
                        title={error.header}
                        action={<AlertActionCloseButton onClose={this.closeAlert} />}>
                {error.message}
              </Alert>}
                <TextContent>
                    <Text component="h1" className="centered">
                        <b>Historical Currency Data</b>
                    </Text>
                </TextContent>
                <Form onSubmit={this.submit} >
                    <Flex>
                        <FlexItem>
                            <FormGroup
                                isInline={true}
                                label="Source currency"
                                fieldId="source_group"
                            >
                                <FormSelect
                                    value={this.state.src}
                                    onChange={this.onChangeSrc}
                                    id="src"
                                    aria-label="FormSelect Input"
                                >

                                    {this.state.loading
                                        ? <FormSelectOption isDisabled={true} label="Loading currencies" />
                                        : this.state.currencies.map((curr, index) => (
                                            <FormSelectOption key={index} value={curr} label={curr} />
                                        ))
                                    }
                                </FormSelect>
                            </FormGroup>
                        </FlexItem>
                        <FlexItem>
                            <FormGroup
                                label="Target currency"
                                isInline={true}
                                fieldId="target_group"
                            >
                                <FormSelect
                                    value={this.state.target}
                                    onChange={this.onChangeTarget}
                                    id="target"
                                    aria-label="FormSelect Input"
                                >
                                    {this.state.loading
                                        ? <FormSelectOption isDisabled={true} label="Loading currencies" />
                                        : this.state.currencies.map((curr, index) => (
                                            <FormSelectOption key={index} value={curr} label={curr} />
                                        ))
                                    }
                                </FormSelect>
                            </FormGroup>
                        </FlexItem>
                    </Flex>
                    <span>
                        <Button isDisabled={this.state.loading || this.state.src === this.state.target} type="submit" variant="primary">Submit</Button>
                    </span>
                </Form>
                {requestExchangeData && exchangeData && <RenderedChart data={exchangeData} target={this.state.target} amount={this.state.amount} />}
                {requestExchangeData && !exchangeData && <Spinner />}
            </React.Fragment>
        )
    }
};

export default CurrencyPicker;
