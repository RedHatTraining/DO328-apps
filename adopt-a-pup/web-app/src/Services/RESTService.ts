import Axios, { AxiosInstance } from "axios";



export abstract class RESTService {

    private readonly axiosInstance: AxiosInstance;
    private readonly remoteServiceName: string;

    constructor(baseUrl: string, remoteServiceName: string) {
        this.remoteServiceName = remoteServiceName;
        this.axiosInstance = Axios.create({ baseURL: baseUrl });
    }

    protected async get<T>(url: string): Promise<T> {
        try {
            const r = await this.axiosInstance.get<T>(url);
            return r.data;
        } catch (e) {
            throw new RESTConnectionError(e, this.remoteServiceName);
        }
    }

    protected async post<T>(url: string, body: T): Promise<any> {
        try {
            const r = await this.axiosInstance.post<T>(url, body);
            return r.data;
        } catch (e) {
            throw new RESTConnectionError(e, this.remoteServiceName, e.response.status);
        }
    }

}


export class RESTConnectionError extends Error {

    public readonly statusCode: number = 500;
    public readonly description: string;
    public readonly remoteStatusCode: number;

    constructor(error: Error, serviceName: string, remoteStatusCode?: number) {
        super();
        this.message = `An error ocurred when calling the remote service <${serviceName}>`;
        this.description = (error && error.message) ? error.message : "No additional information";
        this.remoteStatusCode = remoteStatusCode || 500;
    }

}
