'use client'
import {combineReducers, configureStore} from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import WorkSpaceReducer from '@/app/redux/slices/workspace'
import FolderReducer from '@/app/redux/slices/folder'


const rootreducer = combineReducers({
    FolderReducer,
    WorkSpaceReducer,
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