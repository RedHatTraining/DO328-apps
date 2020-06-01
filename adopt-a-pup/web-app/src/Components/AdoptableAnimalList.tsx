import React from "react";
import {
    Gallery, GalleryItem, Card, CardBody, CardHeader, CardActions, Button, Alert
} from "@patternfly/react-core";
import { AnimalService } from "../Services/AnimalService";
import { Animal } from "../Models/Animal";
import { AdoptionService } from "../Services/AdoptionService";


type AnimalListProps = {
    animalService: AnimalService,
    adoptionService: AdoptionService
}

type AnimalListState = {
    animals: Animal[],
    showAdoptSucessAlert: boolean,
    showAdoptErrorAlert: boolean
}

/**
 * Card list to show adoptable animals and apply for adoption
 */
export default class AdoptableAnimalList extends React.Component<AnimalListProps, AnimalListState> {

    constructor(props: AnimalListProps) {
        super(props);
        this.state = {
            animals: [],
            showAdoptErrorAlert: false,
            showAdoptSucessAlert: false
        };
    }

    public async componentDidMount() {
        const animals = await this.props.animalService.getAllAdoptable();
        this.setState({
            animals
        });
    }

    private async handleAdoptButtonClick(animal: Animal) {
        try {
            await this.props.adoptionService.applyForAdoption(animal);
            this.setState({ showAdoptSucessAlert: true });
        } catch {
            this.setState({ showAdoptErrorAlert: true });
        }

        setTimeout(() => {
            this.setState({
                showAdoptErrorAlert: false,
                showAdoptSucessAlert: false,
            });
        }, 2000);

    }

    public render() {
        return (
            <React.Fragment>
                {this.renderAdoptSuccessAlert()}
                {this.renderAdoptErrorAlert()}
                <Gallery>
                    {this.state.animals.map(animal => this.renderAnimalCard(animal))}
                </Gallery>
            </React.Fragment>
        );
    }


    private renderAnimalCard(animal: Animal) {
        const pictureSrc = `/photos/${animal.id}.jpeg`;

        return (
            <GalleryItem key={animal.id}>
                <Card>
                    <CardHeader>
                        {animal.name}
                    </CardHeader>
                    <CardBody>
                        <img src={pictureSrc} alt={animal.name}></img>
                        <CardActions>
                            <Button onClick={() => this.handleAdoptButtonClick(animal)}>
                                Adopt
                            </Button>
                        </CardActions>
                    </CardBody>
                </Card>
            </GalleryItem>
        );

    }


    private renderAdoptErrorAlert(): React.ReactNode | null {
        if (this.state.showAdoptErrorAlert) {
            return <Alert variant="danger" title="The adoption application failed" />;
        }
        return null;
    }

    private renderAdoptSuccessAlert(): React.ReactNode | null {
        if (this.state.showAdoptSucessAlert) {
            return <Alert variant="success" title="Adoption application sent successfully" />;
        }
        return null;
    }
}
