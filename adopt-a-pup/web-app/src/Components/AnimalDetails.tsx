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

type AnimalDetailsProps = {
    animalService: AnimalService;
    adoptionService: AdoptionService;
}

type AnimalDetailsState = {
    animal: Animal;
}

export default class AnimalDetails extends React.Component<AnimalDetailsProps, AnimalDetailsState> {
    
    constructor(props: AnimalDetailsProps) {
        super(props);
        
    }

    public async componentDidMount() {
        // We need the animal Id or somehow have the animal 
        // that was selected in AdoptableAnimalsList to be passed.. 
        // not sure how to do that
        const animalId = window.location.pathname;
        console.log(animalId);
        
    }

    public render() {
        return(
            <React.Fragment>
                hello
            </React.Fragment>
        )
    }
}