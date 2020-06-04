import { Shelter } from "../Models/Shelter";

export interface ShelterService {
    create(shelter: Shelter): Promise<string>;
    getById(id: string): Promise<Shelter>
    getAll(): Promise<Shelter[]>;
}

