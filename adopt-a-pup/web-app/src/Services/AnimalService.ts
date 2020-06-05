import { Animal } from "../Models/Animal";
import {AnimalNotificationRequest} from "../Models/AnimalNotificationRequest";

export interface AnimalService {
    create(animal: Animal): Promise<string>;
    getAllAdoptable(): Promise<Animal[]>;
    getById(id: string): Promise<Animal>;
    subscribeNotifications(notificationRequest: AnimalNotificationRequest): Promise<void>
}


