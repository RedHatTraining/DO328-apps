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
        const shelters = await this.props.shelterService.getAll();
        this.setState({
            shelters
        });
    }

    public render() {
        const { shelters } = this.state;

        return (
            <List>
                {shelters.map(shelter => <ListItem key={shelter.shelterId}>{shelter.shelterName}</ListItem>)}
            </List>
        );
    }

}
