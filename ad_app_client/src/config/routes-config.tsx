import AddAdvertisement from "../components/pages/AddAdvertisement";
import Ads from "../components/pages/Ads";
import {RouteType} from "../model/RouteType";

export const ADS_PATH = '/all';
export const ADS_BY_MAX_PRICE_PATH = '/price/{maxPrice}';
export const ADS_BY_CATEGORY_PATH = '/category/{category}';
export const ADD_ADVERTISEMENT_PATH = '/add';
export const ROUTES: RouteType[] = [
    {path: ADS_PATH, label: 'Ads', element: <Ads/>},
    {path: ADS_PATH, label: 'Ads by max price', element: <Ads/>},
    {path: ADS_PATH, label: 'Ads by category', element: <Ads/>},
    {path: ADD_ADVERTISEMENT_PATH, label: 'New Ad', element: <AddAdvertisement/>}
]