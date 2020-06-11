import { RESTService } from "./RESTService";
import { AdoptionService } from "./AdoptionService";
import { Animal } from "../Models/Animal";
import { AdoptionApplication } from "../Models/AdoptionApplication";


interface AdoptionResponse {
    status: "APPROVED" | "DENIED",
    message: string
}


export default class AdoptionRESTService extends RESTService implements AdoptionService {

    constructor(baseUrl: string) {
        super(baseUrl, "adoption-service");
    }

    public async getAdoptableByShelter(shelterId: string): Promise<Animal[]> {
        const animalsByShelter = await this.get<Record<string,Animal[]>>(
            "/adoption/getAllAdoptableByShelter"
        );

        for(const key of Object.keys(animalsByShelter)) {
            if (key.includes(`shelterId=${shelterId}`)) {
                return animalsByShelter[key];
            }
        }
        return [];
    }

    public async applyForAdoption(adoptionApplication: AdoptionApplication): Promise<void> {
        const response = await this.post<AdoptionApplication, AdoptionResponse>(
            "/adoption/applyForAdoption",
            adoptionApplication
        );

        if (response.status === "DENIED") {
            throw new AdoptionDeniedError(response.message);
        }
    }

}

export class AdoptionDeniedError extends Error {

    constructor(message: string) {
        super();
        this.name = "Adoption Denied";
        this.message = message;
    }

}
