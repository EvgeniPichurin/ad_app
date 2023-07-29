import AddAdvertisement from "../components/pages/AddAdvertisement";
import Ads from "../components/pages/Ads";
import {RouteType} from "../model/RouteType";

export const ADS_PATH = 'ads/all';
export const ADD_ADVERTISEMENT_PATH = 'ads/add';
export const ROUTES: RouteType[] = [
    {path: ADS_PATH, label: 'Ads', element: <Ads/>},
    {path: ADD_ADVERTISEMENT_PATH, label: 'New Ad', element: <AddAdvertisement/>}
]