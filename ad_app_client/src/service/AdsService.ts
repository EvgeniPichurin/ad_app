import {OperationCode} from "../model/OperationCode";
import {Observable} from 'rxjs';
import {Advertisement} from "../model/Advertisement";

export default interface AdsService {
    add(course: Advertisement): Promise<void>;

    remove(id: number): Promise<void>;

    update(advertisement: Advertisement): Promise<void>;

    get(id: number): Promise<Advertisement>;

    getByMaxPrice(maxPrice: number): Promise<Advertisement[]>;

    getByCategory(category: string): Promise<Advertisement[]>;

    getAll(): Promise<Advertisement[]>;

    getObservableData(): Observable<Advertisement[] | OperationCode>;
}