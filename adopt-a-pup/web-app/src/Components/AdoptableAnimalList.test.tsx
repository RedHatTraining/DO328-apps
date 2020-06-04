import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import AdoptableAnimalList from "./AdoptableAnimalList";


describe("AdoptableAnimalList", () => {


    test("Shows the loaded animals", async() => {
        const animals = [{
            animalId: "a1",
            animalName: "Dog 1",
            breed: "Shepherd",
            shelterId: "s1",
            adoptable: true,
            weight: 100,
            approximateSize: "L",
            residencyRequired: "HOUSE",
            squareFootageOfHome: 800,
            childSafe: true,
            otherDogSafe: true
        }, {
            animalId: "a2",
            animalName: "Dog 2",
            breed: "Shepherd",
            shelterId: "s1",
            adoptable: true,
            weight: 100,
            approximateSize: "L",
            residencyRequired: "HOUSE",
            squareFootageOfHome: 800,
            childSafe: true,
            otherDogSafe: true
        }];

        // We need to wrap AdoptableAnimalList in a router
        // because it contains a Link element
        const { findByText } = render(
            <MemoryRouter>
                <AdoptableAnimalList animals={animals} />
            </MemoryRouter>
        );
        const dog1Element = await findByText(/Dog 1/i);
        const dog2Element = await findByText(/Dog 2/i);

        expect(dog1Element).toBeInTheDocument();
        expect(dog2Element).toBeInTheDocument();
    });

});

