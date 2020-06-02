import { RESTService } from "./RESTService";
import { AdoptionService } from "./AdoptionService";
import { Animal } from "../Models/Animal";
import { AdoptionApplication } from "../Models/AdoptionApplication";


export default class AdoptionRESTService extends RESTService implements AdoptionService {

    constructor(baseUrl: string) {
        super(baseUrl, "adoption-service");
    }

    public getAdoptableByShelter(): Promise<Animal[]> {
        return this.get("/adoption/getAllAdoptableByShelter");
    }

    public async applyForAdoption(adoptionApplication: AdoptionApplication): Promise<void> {
        await this.post("/adoption/applyForAdoption", adoptionApplication);
    }

}