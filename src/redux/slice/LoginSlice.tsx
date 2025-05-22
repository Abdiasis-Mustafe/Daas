"use client"

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"

interface  responded{
    token:string,
    user:{
        id:number,
        name:string,
        email:string,
        role:string,
        password:string
    }
}


interface  regitInitial{
    data:responded|null
    status:'idle'|'loading'|'success'|'failed'
    error:string|null
}

let initialState :regitInitial={
   data:null,
   status:"idle",
   error:null
}

export const loginFN=createAsyncThunk('/api/auth',
    async(data:{email:string,password:string},{rejectWithValue})=>{
        try {
            const response = await axios.post('/api/auth',data)
            return response.data
        } catch (error) {
            if(error  instanceof AxiosError){
                return  rejectWithValue(error.response?.data.message||"login failed")
            }
            rejectWithValue("failed to sign In")
        }
    }
)


export const loginSlice = createSlice({
    name:"Login",
    initialState,
    reducers:{
        resetLogin:()=>initialState
    },
    extraReducers:(builder)=>{
        builder.addCase(loginFN.pending,(state)=>{
            state.status="loading",
            state.error=null
        })
        builder.addCase(loginFN.fulfilled,(state,action)=>{
            state.status="success",
            state.data= action.payload
        })
        builder.addCase(loginFN.rejected,(state,action)=>{
            state.status='failed',
            state.error=action.payload as string
        })
    }

})

export const {resetLogin}=loginSlice.actions