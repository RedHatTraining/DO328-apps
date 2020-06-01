import { RESTService } from "./RESTService";
import { Animal } from "../Models/Animal";
import { AdoptionApplication } from "../Models/AdoptionApplication";
import { AnimalService } from "./AnimalService";


export default class AnimalRESTService extends RESTService implements AnimalService {

    constructor(baseUrl: string) {
        super(baseUrl, "shelter-service");
    }
    public async create(animal: Animal): Promise<void> {
        await this.post(`/${animal.shelterId}/create`, animal);
    }

    public getAllAdoptable(): Promise<Animal[]> {
        throw new Error("Method not implemented.");
    }

    public getById(id: string): Promise<Animal> {
        throw new Error("Method not implemented.");
    }

    public getAdoptableByShelter(): Promise<Animal[]> {
        return this.get("/getAllAdoptableByShelter");
    }

    public async applyForAdoption(adoptionApplication: AdoptionApplication): Promise<void> {
        await this.post("/applyForAdoption", adoptionApplication);
    }

}