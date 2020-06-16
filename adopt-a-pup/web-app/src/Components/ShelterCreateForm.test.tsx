import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import ShelterCreateForm from "./ShelterCreateForm";
import ShelterFakeService from "../Services/ShelterFakeService";
import { ShelterService } from "../Services/ShelterService";
import { Shelter } from "../Models/Shelter";


describe("ShelterForm", () => {

    let shelterService: ShelterService;

    beforeEach(() => {
        shelterService = new ShelterFakeService();
    });

    test("Changes state when name is changed", async() => {
        const component = shallow(<ShelterCreateForm shelterService={shelterService} />);
        component.find("#shelter-form-name").simulate("change", "name1");
        expect(component.state<Shelter>("shelter").shelterName).toBe("name1");
    });

    test("Changes state when address is changed", async() => {
        const component = shallow(<ShelterCreateForm shelterService={shelterService} />);
        component.find("#shelter-form-address").simulate("change", "Av. 123");
        expect(component.state<Shelter>("shelter").address).toBe("Av. 123");
    });

    test("Changes state when state is changed", async() => {
        const component = shallow(<ShelterCreateForm shelterService={shelterService} />);
        component.find("#shelter-form-state").simulate("change", "Tennessee");
        expect(component.state<Shelter>("shelter").state).toBe("Tennessee");
    });

    test("Changes state when email is changed", async() => {
        const component = shallow(<ShelterCreateForm shelterService={shelterService} />);
        component.find("#shelter-form-email").simulate("change", "contact@shelter123.com");
        expect(component.state<Shelter>("shelter").email).toBe("contact@shelter123.com");
    });

    test("Calls shelterService.create when form is submitted", () => {
        shelterService.create = jest.fn();

        const component = shallow(<ShelterCreateForm shelterService={shelterService} />);
        component.setState({
            shelter: {
                shelterName: "My Shelter 1",
                state: "Tennessee",
                address: "Av. 123",
                country: "US",
                email: "contact@shelter123.com",
                phoneNumber: "123456"
            }
        });

        simulateSubmit(component.find("Form"));

        expect(shelterService.create).toHaveBeenCalledWith({
            shelterName: "My Shelter 1",
            state: "Tennessee",
            address: "Av. 123",
            country: "US",
            email: "contact@shelter123.com",
            phoneNumber: "123456"
        });
    });

    test("Changes state to show success alert when form is submitted", async() => {
        shelterService.create = jest.fn();

        const component = shallow(<ShelterCreateForm shelterService={shelterService} />);
        component.setState({
            shelter: {
                shelterName: "My Shelter 1",
                state: "Tennessee",
                address: "Av. 123",
                country: "US",
                email: "contact@shelter123.com",
                phoneNumber: "123456"
            }
        });

        simulateSubmit(component.find("Form"));

        // Wait until all promises all resolved
        await Promise.resolve();

        expect(component.state("showSubmitSucessAlert")).toBe(true);
    });

    test("Does not call shelterService.create when empty form is submitted", () => {
        shelterService.create = jest.fn();

        const component = shallow(<ShelterCreateForm shelterService={shelterService} />);

        simulateSubmit(component.find("Form"));

        expect(shelterService.create).not.toHaveBeenCalled();
    });

    test("Changes state to show invalid form alert when empty form is submitted", () => {
        shelterService.create = jest.fn();

        const component = shallow(<ShelterCreateForm shelterService={shelterService} />);

        simulateSubmit(component.find("Form"));

        expect(component.state("showInvalidFormAlert")).toBe(true);
    });

});


function simulateSubmit(formComponent: ShallowWrapper) {
    // we need to create a fake browser event to simulate a submit
    const event = { preventDefault: () => {} };
    formComponent.simulate("submit", event);
}
