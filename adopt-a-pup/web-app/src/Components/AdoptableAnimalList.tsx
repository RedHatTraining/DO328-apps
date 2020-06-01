import React from "react";
import {
    Gallery, GalleryItem, Card, CardBody, CardHeader, CardActions, Button, Alert
} from "@patternfly/react-core";
import { AnimalService } from "../Services/AnimalService";
import { Animal } from "../Models/Animal";
import { AdoptionService } from "../Services/AdoptionService";
import { Residency } from "../Models/Residency";
import AnimalDetailsView from "../Views/AnimalDetailsView";
import { Link, useHistory } from "react-router-dom";


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
            // TODO: Application form
            const adoptionApplication = {
                username: "todo",
                residency: Residency.HOUSE,
                animalId: animal.animalId,
                squareFootageOfHome: 100,
                occupation: "todo",
                ownOtherAnimals: false,
                kidsUnder16: true,
                email: "todo@todo.com"
            };
            await this.props.adoptionService.applyForAdoption(adoptionApplication);
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
        const pictureSrc = `/photos/${animal.animalId}.jpeg`;

        return (
            <GalleryItem key={animal.animalId}>
                <Card>
                    <CardHeader>
                        {animal.animalName}
                    </CardHeader>
                    <CardBody>
                        <img src={pictureSrc} alt={animal.animalName}></img>
                        <CardActions>
                            {/* <Button onClick={() => this.handleAdoptButtonClick(animal)}>
                                Adopt
                            </Button> */}
                            <Link to={`/animals/${animal.animalId}`}>
                                <Button>
                                    Details
                                </Button>
                            </Link>
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
