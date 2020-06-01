import { Animal } from "../Models/Animal";

export interface AnimalService {
    create(animal: Animal): Promise<void>;
    getAllAdoptable(): Promise<Animal[]>;
    getById(id: string): Promise<Animal>;
}


