import { Animal } from "../Models/Animal";

export interface AnimalService {
    create(animal: Animal): Promise<string>;
    getAllAdoptable(): Promise<Animal[]>;
    getById(id: string): Promise<Animal>;
}


