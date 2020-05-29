export type ShelterParams = {
    name: string
}


export interface ShelterService {
    create(params: ShelterParams): Promise<void>;
    getAll(): Promise<any[]>;
}

