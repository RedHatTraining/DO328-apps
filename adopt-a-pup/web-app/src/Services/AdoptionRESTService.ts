import { RESTService } from "./RESTService";
import { AdoptionService } from "./AdoptionService";
import { Animal } from "../Models/Animal";
import { AdoptionApplication } from "../Models/AdoptionApplication";


export default class AdoptionRESTService extends RESTService implements AdoptionService {

    constructor(baseUrl: string) {
        super(baseUrl, "shelter-service");
    }

    public getAdoptableByShelter(): Promise<Animal[]> {
        return this.get("/getAllAdoptableByShelter");
    }

    public async applyForAdoption(adoptionApplication: AdoptionApplication): Promise<void> {
        await this.post("/applyForAdoption", adoptionApplication);
    }

}