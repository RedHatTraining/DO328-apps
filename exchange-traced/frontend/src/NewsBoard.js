import React, { Component } from 'react';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';
import { EmptyState, EmptyStateIcon, EmptyStateBody, EmptyStateVariant, Bullseye, Title } from '@patternfly/react-core';
import { ErrorCircleOIcon } from '@patternfly/react-icons'

class NewsBoard extends Component {

    normalize(data) {
        return data.map(function (element) {
            return {
                cells: [element.timestamp, element.title]
            }
        });
    }

    componentDidMount() {
        fetch(`http://${process.env.REACT_APP_GW_ENDPOINT}/news`)
            .then(res => res.json())
            .then((data) => {
                this.setState({ rows: this.normalize(data) });
            })
            .catch(console.log)
    }

    constructor(props) {
        super(props);
        this.state = {
            columns: ['Timestamp', 'Story'],
            rows: [{
                heightAuto: true,
                cells: [
                    {
                        props: { colSpan: 2 },
                        title: (
                            <Bullseye>
                                <EmptyState variant={EmptyStateVariant.small}>
                                    <EmptyStateIcon icon={ErrorCircleOIcon} />
                                    <Title headingLevel="h2" size="lg">
                                        No results found
                                    </Title>
                                    <EmptyStateBody>
                                        Unable to get news from external feed.
                                    </EmptyStateBody>
                                </EmptyState>
                            </Bullseye>
                        )
                    },
                ]
            }]
        }
    }

    render() {
        const { columns, rows } = this.state;

        return (
            <Table caption="Latest News" rows={rows} cells={columns}>
            <TableHeader />
            <TableBody />
            </Table>
        )
    }
}

export default NewsBoard;