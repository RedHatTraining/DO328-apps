import React from "react";
import { List, ListItem } from "@patternfly/react-core";
import { ShelterService } from "../Services/ShelterService";


type ShelterListProps = {
    shelterService: ShelterService;
}

type ShelterListState = {
    shelters: Array<any>
}

export default class ShelterList extends React.Component<ShelterListProps, ShelterListState> {

    constructor(props: ShelterListProps) {
        super(props);
        this.state = {
            shelters: []
        };
    }

    public async componentDidMount() {
        const shelters = this.props.shelterService.getAll();
        this.setState({
            shelters
        });
    }

    public render() {
        return (
            <List>
                {this.state.shelters.map(shelter => <ListItem key={shelter.id}>{shelter}</ListItem>)}
            </List>
        );
    }

}
