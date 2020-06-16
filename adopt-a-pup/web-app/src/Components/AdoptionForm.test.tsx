import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import AdoptionForm from "./AdoptionForm";
import AdoptionFakeService from "../Services/AdoptionFakeService";
import { AdoptionService } from "../Services/AdoptionService";
import { Residency } from "../Models/Residency";


describe("AdoptionForm", () => {

    let adoptionService: AdoptionService;
    let component: ShallowWrapper;

    beforeEach(() => {
        adoptionService = new AdoptionFakeService();
        component = shallow(<AdoptionForm
            adoptionService={adoptionService}
            animalId="fake-animal-id"
        />);
    });

    test("Changes state when username is changed", async () => {
        component.find("#adoption-form-username").simulate("change", "John");
        expect(component.state("username")).toBe("John");
    });

    test("Changes state when email is changed", async () => {
        component.find("#adoption-form-email").simulate("change", "test@example.com");
        expect(component.state("email")).toBe("test@example.com");
    });

    test("Changes state when occupation is changed", async () => {
        component.find("#adoption-form-occupation").simulate("change", "Pilot");
        expect(component.state("occupation")).toBe("Pilot");
    });

    test("Changes state when footage is changed", async () => {
        component.find("#adoption-form-footage").simulate("change", "100");
        expect(component.state("squareFootageOfHome")).toBe(100);
    });

    test("Calls adoptionService.create when form is submitted", () => {
        adoptionService.applyForAdoption = jest.fn();

        component.setState({
            username: "John",
            email: "test@example.com",
            occupation: "Pilot",
            residency: Residency.APARTMENT,
            squareFootageOfHome: 0,
            kidsUnder16: true,
            ownOtherAnimals: false,
        });

        simulateSubmit(component.find("Form"));

        expect(adoptionService.applyForAdoption).toHaveBeenCalledWith({
            animalId: "fake-animal-id",
            username: "John",
            email: "test@example.com",
            occupation: "Pilot",
            residency: "APARTMENT",
            squareFootageOfHome: 0,
            kidsUnder16: true,
            ownOtherAnimals: false,
        });
    });

    test("Changes state to show success alert when form is submitted", async () => {
        component.setState({
            username: "John",
            email: "test@example.com",
            occupation: "Pilot",
            residency: Residency.APARTMENT,
            squareFootageOfHome: 0,
            kidsUnder16: true,
            ownOtherAnimals: false,
        });

        simulateSubmit(component.find("Form"));

        // Wait until all promises all resolved
        await Promise.resolve();

        expect(component.state("showAdoptSuccessAlert")).toBe(true);
    });

    test("Does not call AdoptionService.create when empty form is submitted", () => {
        adoptionService.applyForAdoption = jest.fn();

        simulateSubmit(component.find("Form"));

        expect(adoptionService.applyForAdoption).not.toHaveBeenCalled();
    });

    test("Changes state to show invalid form alert when empty form is submitted", () => {
        simulateSubmit(component.find("Form"));

        expect(component.state("showInvalidFormAlert")).toBe(true);
    });

});


function simulateSubmit(formComponent: ShallowWrapper) {
    // we need to create a fake browser event to simulate a submit
    const event = { preventDefault: () => { } };
    formComponent.simulate("submit", event);
}
