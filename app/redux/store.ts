'use client'
import {combineReducers, configureStore} from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useSelector } from 'react-redux'


const rootreducer = combineReducers({
   
})

export const store = configureStore({
    reducer : rootreducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector