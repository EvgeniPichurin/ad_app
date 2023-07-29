import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import { Advertisement } from "../model/Advertisement"
import { OperationCode } from "../model/OperationCode"
import { adsReducer, operationCodeReducer } from "./reducers"

export type StateType = {
    advertisements: Advertisement[],
    operationCode: OperationCode
}
const reducer = combineReducers<StateType> ({
    advertisements: adsReducer as any,
    operationCode: operationCodeReducer as any
})
export const store = configureStore({reducer,
    middleware: (getMiddleware) => getMiddleware({
        serializableCheck: false
    })})