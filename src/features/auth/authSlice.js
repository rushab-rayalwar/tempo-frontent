// third party imports
import { createSlice } from "@reduxjs/toolkit";

// local imports
import authThunk from "./authThunk";

const INITIAL_STATE = {
    isLoggedIn : false,
    user : {}
}

const authSlice = createSlice({
    name:"auth",
    initialState:INITIAL_STATE,
    reducers:{
        
    },
    extraReducers : (builder)=>{
        builder
            .addCase(authThunk.fulfilled, (state, action)=>{
                state.isLoggedIn = true;
                state.user = action.payload.data;
            })
            .addCase(authThunk.rejected, (state, action)=>{
                state.isLoggedIn = false;
                state.user = null;
            })
    }
});