import { PayloadAction } from "@reduxjs/toolkit";
import { adService } from "../config/service-config";
import { Advertisement } from "../model/Advertisement";
import { OperationCode } from "../model/OperationCode";
export const SET_ADS_ACTION = "/ads/set";
export const OPERATION_CODE_ACTION = "operation-code"
export function setAds(advertisements: Advertisement[]) : PayloadAction<Advertisement[]> {
    return {payload: advertisements, type: SET_ADS_ACTION};
}
export function setOperationCode(operationCode: OperationCode): PayloadAction<OperationCode> {
    return {payload: operationCode, type: OPERATION_CODE_ACTION};
}
export function add(advertisement: Advertisement): (dispatch: any)=>void {
    return async (dispatch) => {
        try {
            await adService.add(advertisement);
            const advertisements: Advertisement[] = await adService.getAll();
            dispatch(setAds(advertisements));
            dispatch(setOperationCode(OperationCode.OK));
        } catch (err: any) {
            dispatch(setOperationCode(err));
        }
    }
}
export function remove(id: number): (dispatch: any)=>void {
    return async (dispatch) => {
        try {
            await adService.remove(id);
            const advertisements: Advertisement[] = await adService.getAll();
            dispatch(setAds(advertisements));
            dispatch(setOperationCode(OperationCode.OK))
        } catch (err: any) {
            dispatch(setOperationCode(err));
        }
    }
}
export function update(advertisement: Advertisement): (dispatch: any)=>void {
    return async (dispatch) => {
        try {
            await adService.update(advertisement);
            const advertisements: Advertisement[] = await adService.getAll();
            dispatch(setAds(advertisements));
            dispatch(setOperationCode(OperationCode.OK));
        } catch (err: any) {
            dispatch(setOperationCode(err));
        }
    }
}

export function getByMaxPrice(price: number): (dispatch: any)=>void {
    return async (dispatch) => {
        try {
            const advertisements: Advertisement[] = await adService.getByMaxPrice(price);
            dispatch(setAds(advertisements));
            dispatch(setOperationCode(OperationCode.OK));
        } catch (err: any) {
            dispatch(setOperationCode(err));
        }
    }
}

export function getByCategory(category: string): (dispatch: any)=>void {
    return async (dispatch) => {
        try {
            const advertisements: Advertisement[] = await adService.getByCategory(category);
            dispatch(setAds(advertisements));
            dispatch(setOperationCode(OperationCode.OK));
        } catch (err: any) {
            dispatch(setOperationCode(err));
        }
    }
}

export function getById(id: number): (dispatch: any)=>void {
    return async (dispatch) => {
        try {
            const advertisement: Advertisement = await adService.get(id);
            dispatch(setAds([advertisement]));
            dispatch(setOperationCode(OperationCode.OK));
        } catch (err: any) {
            dispatch(setOperationCode(err));
        }
    }
}