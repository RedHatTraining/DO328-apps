import { Animal } from "../Models/Animal";

export interface AnimalService {
    create(): Promise<void>;
    getAllAdoptable(): Promise<Animal[]>;
    getById(id: string): Promise<Animal>;
}


