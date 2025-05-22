"use client"
import { configureStore } from "@reduxjs/toolkit";




export const store = configureStore({
    reducer:{
        // register:registerSlice.reducer,
        // login: loginSlice.reducer
    }
})

export type RootState= ReturnType<typeof store.getState>
export type Appdispatch = typeof store.dispatch