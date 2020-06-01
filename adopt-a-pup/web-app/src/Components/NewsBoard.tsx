import React from "react";
import { Table, TableHeader, TableBody } from "@patternfly/react-table";
import {
    EmptyState, EmptyStateIcon, EmptyStateBody, EmptyStateVariant, Bullseye, Title
} from "@patternfly/react-core";
import { ErrorCircleOIcon } from "@patternfly/react-icons";
import { NewsService } from "../Services/NewsService";
import { News } from "../Models/News";


type NewsBoardProps = {
    newsService: NewsService;
}

type NewsBoardState = {
    news: News[]
}


export default class NewsBoard extends React.Component<NewsBoardProps, NewsBoardState> {

    constructor(props: NewsBoardProps) {
        super(props);
        this.state = {
            news: []
        };
    }

    public async componentDidMount() {
        const news = await this.props.newsService.getAll();
        this.setState({
            news
        });
    }

    public render() {
        return (
            <Table caption="Latest News" rows={this.getRows()} cells={this.getColumns()}>
                <TableHeader />
                <TableBody />
            </Table>
        );
    }

    private getColumns(): [string, string] {
        return ["Timestamp", "Story"];
    }

    private getRows() {
        if (this.state.news.length === 0) {
            return this.getRowsForEmptyTable();
        }
        return this.state.news.map(this.newsToRow);
    }

    private newsToRow(newsItem: News) {
        return { cells: [newsItem.timestamp, newsItem.title] };
    }

    private getRowsForEmptyTable() {
        return  [{
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
        }];
    }
}
