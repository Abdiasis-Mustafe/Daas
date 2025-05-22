"use client"

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"
import { error } from "console"



interface Respondate{
    id: number
    name:string
    email:string
    password:string
    role:string
}

interface  regitInitial{
    data:Respondate|null
    status:'idle'|'loading'|'success'|'failed'
    error:string|null
}

let initialState :regitInitial={
    data:null,
    status:'idle',
    error:null,
}

export const registerFn= createAsyncThunk('/api/users',
    async(data:{name:string,email:string,password:string},{rejectWithValue})=>{
        try {
            const response= await axios.post('/api/users',data)

        return response.data
        } catch (error) {
             if(error instanceof AxiosError){
                return rejectWithValue(error.response?.data.message||"failed to register")
             }
        }
    } 
    
)


export const registerSlice= createSlice({
    name:'register',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(registerFn.pending,(state)=>{
            state.status="loading"
            state.error=null
        })
        builder.addCase(registerFn.fulfilled,(state,action)=>{
            state.status='success'
            state.data= action.payload
            
        })
        builder.addCase(registerFn.rejected,(state,action)=>{
            state.status='failed'
            state.error= action.payload as string
        })
    }

})