import { ShelterService } from "./ShelterService";


export default class ShelterFakeService implements ShelterService {

    public async create(): Promise<void> {
        alert("ShelterFakeService: create() was called!");
        return Promise.resolve();
    }

    public async getAll(): Promise<any[]> {
        return [
            { id: "s1", name: "Shelter 1" },
            { id: "s2", name: "Shelter 2" }
        ];
    }
}