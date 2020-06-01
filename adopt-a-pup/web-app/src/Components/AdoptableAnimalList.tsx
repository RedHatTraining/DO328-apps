import React from "react";
import {
    Gallery, GalleryItem, Card, CardBody, CardHeader, CardActions, Button
} from "@patternfly/react-core";
import { AnimalService } from "../Services/AnimalService";
import { Animal } from "../Models/Animal";


type AnimalListProps = {
    animalService: AnimalService
}

type AnimalListState = {
    animals: Animal[]
}

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
        const { animals } = this.state;

        return (
            <Gallery>
                {animals.map(this.renderAnimalCard)}
            </Gallery>
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
                            <Button >Adopt</Button>
                        </CardActions>
                    </CardBody>

                </Card>
            </GalleryItem>
        );

    }

}
