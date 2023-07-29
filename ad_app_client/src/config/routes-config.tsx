import AddAdvertisement from "../components/pages/AddAdvertisement";
import Ads from "../components/pages/Ads";
import {RouteType} from "../model/RouteType";

export const ADS_PATH = 'ads/all';
export const ADS_BY_MAX_PRICE_PATH = 'ads/price';
export const ADS_BY_CATEGORY_PATH = 'ads/category';
export const ADD_ADVERTISEMENT_PATH = 'ads/add';
export const ROUTES: RouteType[] = [
    {path: ADS_PATH, label: 'Ads', element: <Ads/>},
    {path: ADS_BY_MAX_PRICE_PATH, label: 'Ads by max price', element: <Ads/>},
    {path: ADS_BY_CATEGORY_PATH, label: 'Ads by category', element: <Ads/>},
    {path: ADD_ADVERTISEMENT_PATH, label: 'New Ad', element: <AddAdvertisement/>}
]