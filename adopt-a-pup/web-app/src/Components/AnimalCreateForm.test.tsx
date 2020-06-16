import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import AnimalCreateForm from "./AnimalCreateForm";
import AnimalFakeService from "../Services/AnimalFakeService";
import { Animal } from "../Models/Animal";
import { AnimalService } from "../Services/AnimalService";
import { ShelterService } from "../Services/ShelterService";
import { PhotoService } from "../Services/PhotoService";
import ShelterFakeService from "../Services/ShelterFakeService";
import { PhotoStaticListService } from "../Services/PhotoStaticListService";


describe("AnimalForm", () => {

    let animalService: AnimalService;
    let shelterService: ShelterService;
    let photoService: PhotoService;
    let component: ShallowWrapper;

    beforeEach(() => {
        animalService = new AnimalFakeService();
        shelterService = new ShelterFakeService();
        photoService = new PhotoStaticListService();
        component = shallow(<AnimalCreateForm
            animalService={animalService}
            shelterService={shelterService}
            photoService={photoService}
        />);
    });

    test("Changes state when name is changed", async() => {
        component.find("#animal-form-name").simulate("change", "Darwin");
        expect(component.state<Animal>("animal").animalName).toBe("Darwin");
    });

    test("Changes state when adoptable is changed", async() => {
        component.find("#animal-form-adoptable").simulate("change", true);
        expect(component.state<Animal>("animal").adoptable).toBe(true);
    });

    test("Changes state when breed is changed", async() => {
        component.find("#animal-form-breed").simulate("change", "Shepherd");
        expect(component.state<Animal>("animal").breed).toBe("Shepherd");
    });

    test("Changes state when childSafe is changed", async() => {
        component.find("#animal-form-kid-safe").simulate("change", true);
        expect(component.state<Animal>("animal").childSafe).toBe(true);
    });

    test("Calls animalService.create when form is submitted", () => {
        animalService.create = jest.fn();

        component.setState({
            animal: {
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
            }
        });

        simulateSubmit(component.find("Form"));

        expect(animalService.create).toHaveBeenCalledWith({
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
        });
    });

    test("Changes state to show success alert when form is submitted", async() => {
        animalService.create = jest.fn();

        component.setState({
            animal: {
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
            }
        });

        simulateSubmit(component.find("Form"));

        // Wait until all promises all resolved
        await Promise.resolve();

        expect(component.state("showSubmitSucessAlert")).toBe(true);
    });

    test("Does not call AnimalService.create when empty form is submitted", () => {
        animalService.create = jest.fn();

        simulateSubmit(component.find("Form"));

        expect(animalService.create).not.toHaveBeenCalled();
    });

    test("Changes state to show invalid form alert when empty form is submitted", () => {
        animalService.create = jest.fn();

        simulateSubmit(component.find("Form"));

        expect(component.state("showInvalidFormAlert")).toBe(true);
    });

});


function simulateSubmit(formComponent: ShallowWrapper) {
    // we need to create a fake browser event to simulate a submit
    const event = { preventDefault: () => {} };
    formComponent.simulate("submit", event);
}
