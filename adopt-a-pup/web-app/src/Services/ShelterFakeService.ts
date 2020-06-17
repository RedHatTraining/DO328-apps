import { ShelterService } from "./ShelterService";
import { Shelter } from "../Models/Shelter";
import { delay } from "./Delayer";


export default class ShelterFakeService implements ShelterService {

    public async getById(id: string): Promise<Shelter> {
        return delay(() => ({
            shelterId: id,
            shelterName: "A Fake Shelter",
            state: "Minnesota",
            country: "US",
            address: "200 Good Boy Ave",
            email: "frontdesk@minneapolismutts.com",
            phoneNumber: "212-555-9758"
        }));
    }

    public async create(): Promise<string> {
        console.log("ShelterFakeService: create() was called!");
        return delay(() => "fake-shelter-id");
    }

    public async getAll(): Promise<Shelter[]> {
        return delay(() => [
            {
                shelterId: "1234",
                shelterName: "A Fake Shelter 1",
                state: "Minnesota",
                country: "US",
                address: "200 Good Boy Ave",
                email: "frontdesk@minneapolismutts.com",
                phoneNumber: "212-555-9758"
            },
            {
                shelterId: "3456",
                shelterName: "A Fake Shelter 2",
                state: "Minnesota",
                country: "US",
                address: "100 Good Boy Ave",
                email: "frontdesk@minneapolismutts2.com",
                phoneNumber: "212-444-8475"
            }
        ]);
    }
}
