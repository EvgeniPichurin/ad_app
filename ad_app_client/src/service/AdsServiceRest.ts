import {OperationCode} from "../model/OperationCode";
import AdsService from "./AdsService";
import {Observable, Subscriber} from "rxjs";
import {Advertisement} from "../model/Advertisement";

const POLLING_INTERVAL = 5000;
let curData: any;

function getHeaders(): any {
    return {
        "Content-Type": "application/json"
    }
}

async function responseProcessing(response: Response): Promise<any> {
    if (response.status < 400) {
        return await response.json();
    }
    if (response.status >= 500) {
        throw OperationCode.SERVER_UNAVAILABLE
    }
    throw OperationCode.UNKNOWN
}

export default class AdsServiceRest implements AdsService {
    private observable: Observable<Advertisement[] | OperationCode> | undefined;
    private observer: Subscriber<Advertisement[] | OperationCode> | undefined;

    constructor(private url: string) {
        console.log(url)
    }

    private observing() {
        this.getAll().then(advertisements => {
            if (JSON.stringify(advertisements) !== JSON.stringify(curData)) {
                curData = advertisements;
                this.observer?.next(advertisements)
            }
        })
            .catch(err => {
                if (err == OperationCode.UNKNOWN) {
                    this.observer?.next(OperationCode.UNKNOWN)
                    this.observer?.complete();
                } else {
                    this.observer?.next(err)
                }
            })
    }

    getObservableData(): Observable<Advertisement[] | OperationCode> {
        if (!this.observable || this.observer!.closed) {
            this.observable = new Observable(observer => {
                let intervalId: any;
                this.observer = observer;
                this.observing();
                intervalId = setInterval(this.observing.bind(this), POLLING_INTERVAL);
                return () => clearInterval(intervalId)
            })
        }
        return this.observable;
    }

    async add(advertisement: Advertisement): Promise<void> {
        (advertisement as any).userId = 1;
        let response: Response;
        try {
            response = await fetch(this.url, {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify(advertisement)
            });
        } catch (err) {
            throw OperationCode.SERVER_UNAVAILABLE;
        }
        await responseProcessing(response);
    }

    async getAll(): Promise<Advertisement[]> {
        let response: Response;
        try {
            response = await fetch(this.getUrlAll(), {
                headers: getHeaders()
            });
        } catch (err) {
            throw OperationCode.SERVER_UNAVAILABLE;
        }
        const advertisements: Advertisement[] = await responseProcessing(response);
        return advertisements.map(ad => ({...ad}))
    }

    async getByMaxPrice(maxPrice: number) {
        let response: Response;
        try {
            response = await fetch(this.getUrlMaxPrice(maxPrice), {
                headers: getHeaders()
            });
        } catch (err) {
            throw OperationCode.SERVER_UNAVAILABLE;
        }
        const advertisements: Advertisement[] = await responseProcessing(response);
        return advertisements.map(ad => ({...ad}))
    }

    async getByCategory(category: string) {
        let response: Response;
        try {
            response = await fetch(this.getUrlCategory(category), {
                headers: getHeaders()
            });
        } catch (err) {
            throw OperationCode.SERVER_UNAVAILABLE;
        }
        const advertisements: Advertisement[] = await responseProcessing(response);
        return advertisements.map(ad => ({...ad}))
    }

    async get(id: number): Promise<Advertisement> {
        let response: Response;
        try {
            response = await fetch(this.getUrlId(id), {
                headers: getHeaders()
            });
        } catch (err) {
            throw OperationCode.SERVER_UNAVAILABLE;
        }
        return await responseProcessing(response);
    }

    async remove(id: number): Promise<void> {
        let response: Response
        try {
            response = await fetch(this.getUrlId(id), {
                method: "DELETE",
                headers: getHeaders()
            })
        } catch (err) {
            throw OperationCode.SERVER_UNAVAILABLE;
        }
        await responseProcessing(response);
    }

    async update(advertisement: Advertisement): Promise<void> {
        let response: Response
        try {
            response = await fetch(this.url, {
                method: "PUT",
                headers: getHeaders(),
                body: JSON.stringify(advertisement)

            })
        } catch (err) {
            throw OperationCode.SERVER_UNAVAILABLE;
        }
        await responseProcessing(response);
    }

    private getUrlId(id: number): RequestInfo {
        return `${this.url}/${id}`;
    }

    private getUrlAll(): RequestInfo {
        return `${this.url}/all`;
    }

    private getUrlMaxPrice(maxPrice: number) {
        return `${this.url}/price/${maxPrice}`;
    }

    private getUrlCategory(category: string) {
        return `${this.url}/category/${category}`;
    }
}