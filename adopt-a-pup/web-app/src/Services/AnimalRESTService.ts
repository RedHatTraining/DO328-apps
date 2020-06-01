import { RESTService } from "./RESTService";
import { Animal } from "../Models/Animal";
import { AdoptionApplication } from "../Models/AdoptionApplication";
import { AnimalService } from "./AnimalService";


export default class AnimalRESTService extends RESTService implements AnimalService {

    constructor(baseUrl: string) {
        super(baseUrl, "shelter-service");
    }
    public async create(animal: Animal): Promise<void> {
        await this.post(`/animals/${animal.shelterId}/create`, animal);
    }

    public getAllAdoptable(): Promise<Animal[]> {
        return this.get("/animals/getAllAdoptable")
    }

    public getById(id: string): Promise<Animal> {
        return this.get(`/animals/${id}/getAnimalById`);
    }

    public getAdoptableByShelter(): Promise<Animal[]> {
        return this.get("/animals/getAllAdoptableByShelter");
    }

    public async applyForAdoption(adoptionApplication: AdoptionApplication): Promise<void> {
        await this.post("/animals/applyForAdoption", adoptionApplication);
    }

}