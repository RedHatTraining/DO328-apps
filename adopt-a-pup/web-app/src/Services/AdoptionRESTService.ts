import { RESTService } from "./RESTService";
import { AdoptionService } from "./AdoptionService";
import { Animal } from "../Models/Animal";
import { AdoptionApplication } from "../Models/AdoptionApplication";


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
        await this.post("/adoption/applyForAdoption", adoptionApplication);
    }

}