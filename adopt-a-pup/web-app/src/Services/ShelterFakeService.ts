import { ShelterService } from "./ShelterService";


export default class ShelterFakeService implements ShelterService {

    public async create(): Promise<void> {
        alert("ShelterFakeService: create() was called!");
        return Promise.resolve();
    }

    public async getAll(): Promise<any[]> {
        return [
            { shelterId: "s1", shelterName: "Shelter 1" },
            { shelterId: "s2", shelterName: "Shelter 2" }
        ];
    }
}