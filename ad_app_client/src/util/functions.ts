import {RouteType} from "../model/RouteType";

export function getRouteIndex(items: RouteType[], pathname: string): number {
    let index = items.findIndex(item => item.path === pathname);
    return index > 0 ? index : 0;
}