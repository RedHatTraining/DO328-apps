import React from "react";
import {
    Gallery, GalleryItem, Card, CardBody, CardHeader, CardActions, Button, Alert
} from "@patternfly/react-core";
import { AnimalService } from "../Services/AnimalService";
import { Animal } from "../Models/Animal";
import { AdoptionService } from "../Services/AdoptionService";
import { Link } from "react-router-dom";


type AnimalListProps = {
    animalService: AnimalService,
    adoptionService: AdoptionService
}

type AnimalListState = {
    animals: Animal[]
}



/**
 * Card list to show adoptable animals and apply for adoption
 */
export default class AdoptableAnimalList extends React.Component<AnimalListProps, AnimalListState> {

    constructor(props: AnimalListProps) {
        super(props);
        this.state = {
            animals: []
        };
    }

    public async componentDidMount() {
        const animals = await this.props.animalService.getAllAdoptable();
        this.setState({
            animals
        });
    }

    public render() {
        return (
            <React.Fragment>
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

}
