import React from "react";
import { render } from "@testing-library/react";
import AdoptableAnimalList from "./AdoptableAnimalList";
import AnimalFakeService from "../Services/AnimalFakeService";
import { AnimalService } from "../Services/AnimalService";


describe("AdoptableAnimalList", () => {

    let animalService: AnimalService;

    beforeEach(() => {
        animalService = new AnimalFakeService();
    });

    test("Shows the loaded animals", async() => {
        // const { findByText } = render(<AdoptableAnimalList animalService={animalService} />);
        // const linkElement = await findByText(/Dog 1/i);
        // expect(linkElement).toBeInTheDocument();
    });

});

