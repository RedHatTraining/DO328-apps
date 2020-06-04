import React from "react";
import { List, ListItem, Button, Level, LevelItem } from "@patternfly/react-core";
import { ShelterService } from "../Services/ShelterService";
import { Shelter } from "../Models/Shelter";
import { Link } from "react-router-dom";
import { RESTConnectionError } from "../Services/RESTService";
import LoadingData from "./LoadingData";


type ShelterListProps = {
    shelterService: ShelterService;
}

type ShelterListState = {
    shelters: Array<Shelter>,
    loading: boolean,
    error: {
        isActive: boolean,
        header: string,
        message: string
    }
}

export default class ShelterList extends React.Component<ShelterListProps, ShelterListState> {

    constructor(props: ShelterListProps) {
        super(props);
        this.state = {
            shelters: [],
            loading: false,
            error: {
                isActive: false,
                header: "",
                message: ""
            }
        };
    }

    public async componentDidMount() {
        this.setState({ loading: true });

        try {
            const shelters = await this.props.shelterService.getAll();
            this.setState({ shelters });
        } catch (error) {
            if (error instanceof RESTConnectionError) {
                this.showConnectionError(error);
            }
        } finally {
            this.setState({ loading: false });
        }
    }

    private showConnectionError(error: RESTConnectionError) {
        this.setState({
            error: {
                isActive: true,
                header: error.message,
                message: error.description,
            }
        });
    }

    private closeErrorAlert = () => {
        this.setState({
            error: {
                isActive: false,
                message: "",
                header: ""
            }
        });
    }

    public render() {
        const { shelters, loading, error } = this.state;

        return (
            <LoadingData
                showLoader={loading}
                showError={error.isActive}
                errorTitle={error.header}
                errorDescription={error.message}
                onErrorClosed={this.closeErrorAlert}
            >
                <List>
                    {shelters.map(shelter => <ListItem key={shelter.shelterId}>
                        {this.renderShelter(shelter)}
                    </ListItem>)}
                </List>
            </LoadingData>
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
