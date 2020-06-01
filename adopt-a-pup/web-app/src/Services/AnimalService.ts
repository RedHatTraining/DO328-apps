export interface AnimalService {
    create(): Promise<void>;
    getAllAdoptable(): Promise<Animal[]>;
    getById(id: string): Promise<Animal>;
}

export interface Animal {
    animalId: string;
    animalName: string;
    shelterId: string;
    breed: string;
    adoptable: boolean;
}

