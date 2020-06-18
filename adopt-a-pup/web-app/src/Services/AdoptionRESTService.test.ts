import Axios from "axios";
import AdoptionRESTService, { AdoptionDeniedError } from "./AdoptionRESTService";
import { Residency } from "../Models/Residency";

jest.mock("axios");

describe("AdoptionRESTService", () => {


    let service: AdoptionRESTService;

    beforeEach(() => {
        Axios.create = jest.fn().mockReturnValue(Axios);
        service = new AdoptionRESTService("http://adoption-service.example.com");
    });

    test("adopt sends a POST request", async () => {
        (Axios.post as jest.Mock).mockResolvedValue({
            status: 200,
            data: {
                status: "APPROVED"
            }
        });

        await service.applyForAdoption({
            animalId: "fake-animal-id",
            username: "John",
            email: "test@example.com",
            occupation: "Pilot",
            residency: Residency.APARTMENT,
            squareFootageOfHome: 500,
            kidsUnder16: true,
            ownOtherAnimals: false,
        });

        expect(Axios.post).toHaveBeenCalledWith(
            "/adoption/applyForAdoption",
            {
                animalId: "fake-animal-id",
                username: "John",
                email: "test@example.com",
                occupation: "Pilot",
                residency: Residency.APARTMENT,
                squareFootageOfHome: 500,
                kidsUnder16: true,
                ownOtherAnimals: false,
            },
            {
                timeout: 10000
            }
        );
    });

    test("throws error when adoption is not denied", async () => {
        (Axios.post as jest.Mock).mockResolvedValue({
            status: 200,
            data: {
                status: "DENIED",
                message: "There was a problem with your application"
            }
        });

        expect.assertions(2);
        try {
            await service.applyForAdoption({
                animalId: "fake-animal-id",
                username: "John",
                email: "test@example.com",
                occupation: "Pilot",
                residency: Residency.APARTMENT,
                squareFootageOfHome: 500,
                kidsUnder16: true,
                ownOtherAnimals: false,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(AdoptionDeniedError);
            expect(error.message).toContain("There was a problem with your application");
        }
    });
});
