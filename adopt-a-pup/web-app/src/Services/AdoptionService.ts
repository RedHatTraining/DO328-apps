import { Animal } from "../Models/Animal";
import { AdoptionApplication } from "../Models/AdoptionApplication";


export interface AdoptionService {
    getAdoptableByShelter(): Promise<Animal[]>;
    applyForAdoption(adoptionApplication: AdoptionApplication): Promise<void>;
}
