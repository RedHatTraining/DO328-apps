import { Animal } from "../Models/Animal";


export interface AdoptionService {
    getAdoptableByShelter(): Promise<Animal[]>;
    applyForAdoption(animal: Animal): Promise<void>;
}
