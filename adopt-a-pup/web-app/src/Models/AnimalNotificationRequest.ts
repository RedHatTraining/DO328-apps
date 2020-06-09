import {ApproximateSize} from "./ApproximateSize";

export  interface AnimalNotificationRequest {
    username: string,
    email: string,
    breed: string,
    minWeight: number,
    maxWeight: number,
    approximateSize: string
}