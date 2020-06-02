import { Shelter } from "../Models/Shelter";

export type ShelterParams = {
    name: string
}


export interface ShelterService {
    create(params: ShelterParams): Promise<void>;
    getById(id: string): Promise<Shelter>
    getAll(): Promise<Shelter[]>;
}

