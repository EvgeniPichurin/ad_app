import {PayloadAction} from "@reduxjs/toolkit";
import {Reducer} from "react";
import {Advertisement} from "../model/Advertisement";
import {OperationCode} from "../model/OperationCode";
import {OPERATION_CODE_ACTION, SET_ADS_ACTION} from "./actions";

export const adsReducer: Reducer<Advertisement[], PayloadAction<Advertisement[]>> =
    (ads = [], action): Advertisement[] => {
        return action.type === SET_ADS_ACTION ? action.payload : ads;
    }
export const operationCodeReducer: Reducer<OperationCode, PayloadAction<OperationCode>> =
    (operationCode = OperationCode.OK, action): OperationCode => {
        if (action.type === OPERATION_CODE_ACTION) {
            return action.payload;
        }
        return operationCode;
}