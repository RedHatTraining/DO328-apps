import React from "react";
import { Link } from "react-router-dom";
import {
    Gallery, GalleryItem, Card, CardBody, CardHeader, CardActions, Button
} from "@patternfly/react-core";
import { Animal } from "../Models/Animal";


type AnimalListProps = {
    animals: Animal[]
}




/**
 * Card list to show adoptable animals and apply for adoption
 */
export default class AdoptableAnimalList extends React.Component<AnimalListProps> {

    public render() {
        return (
            <React.Fragment>
                <Gallery>
                    {this.props.animals.map(animal => this.renderAnimalCard(animal))}
                </Gallery>
            </React.Fragment>

        );
    }


    private renderAnimalCard(animal: Animal) {
        // const pictureSrc = `/frontend/photos/${animal.animalId}.jpeg`;

        return (
            <GalleryItem key={animal.animalId}>
                <Card>
                    <CardHeader>
                        {animal.animalName}
                    </CardHeader>
                    <CardBody>
                        <img src={animal.photoUrl} alt={animal.animalName}/>
                        <CardActions>
                            <Link to={`/animals/details/${animal.animalId}`}>
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
