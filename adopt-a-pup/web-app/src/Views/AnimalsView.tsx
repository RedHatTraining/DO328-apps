import React from "react";
import { AnimalService } from "../Services/AnimalService";
import { 
    PageSection, PageSectionVariants, Text, TextContent, Alert, AlertActionCloseButton 
} from "@patternfly/react-core";
import AdoptableAnimalList from "../Components/AdoptableAnimalList";
import { AdoptionService } from "../Services/AdoptionService";
import { Animal } from "../Models/Animal";
import { RESTConnectionError } from "../Services/RESTService";
import BullseyeSpinner from "../Components/BullseyeSpinner";


type AnimalsViewProps = {
    animalService: AnimalService;
    adoptionService: AdoptionService;
}

type AnimalsViewState = {
    animals: Animal[],
    loading: boolean,
    error: {
        isActive: boolean,
        header: string,
        message: string
    }
}


export default class AnimalsView extends React.Component<AnimalsViewProps, AnimalsViewState> {

    constructor(props: AnimalsViewProps) {
        super(props);
        this.state = {
            animals: [],
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
            const animals = await this.props.animalService.getAllAdoptable();
            this.setState({ animals });
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

    private closeAlert = () => {
        this.setState({
            error: {
                isActive: false,
                message: "",
                header: ""
            }
        });
    }

    public render() {
        const { error, loading } = this.state;

        return (
            <React.Fragment>
                <PageSection variant={PageSectionVariants.light}>
                    <TextContent>
                        <Text component="h1">Animals</Text>
                        <Text component="p">
                            These animals are waiting for you!
                        </Text>
                    </TextContent>
                </PageSection>
                <PageSection>
                {error.isActive &&
                    <Alert
                        className="popup"
                        variant="danger"
                        title={error.header}
                        action={<AlertActionCloseButton onClose={this.closeAlert} />}>
                        {error.message}
                    </Alert>}
                    <Text component="h2">Adoptable Animals</Text>
                    { loading && <BullseyeSpinner />}
                    <AdoptableAnimalList animals={this.state.animals} />
                </PageSection>
            </React.Fragment>
        );
    }

}
