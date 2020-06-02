import React from "react";
import { List, ListItem, Button, Level, LevelItem } from "@patternfly/react-core";
import { ShelterService } from "../Services/ShelterService";
import { Shelter } from "../Models/Shelter";
import { Link } from "react-router-dom";


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
                {shelters.map(shelter => <ListItem key={shelter.shelterId}>
                    {this.renderShelter(shelter)}
                </ListItem>)}
            </List>

        );
    }

    private renderShelter(shelter: Shelter) {
        return (
            <React.Fragment>
                <Level>
                    <LevelItem>
                        {shelter.shelterName}
                    </LevelItem>
                    <LevelItem>
                        <Link to={`/shelters/${shelter.shelterId}`}>
                            <Button>
                                Details
                            </Button>
                        </Link>
                    </LevelItem>
                </Level>
            </React.Fragment>
        );
    }

}
