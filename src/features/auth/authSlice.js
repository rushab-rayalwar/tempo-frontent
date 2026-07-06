// third party imports
import { createSlice } from "@reduxjs/toolkit";

// local imports
import { loginThunk, registerThunk } from "./authThunk";

const INITIAL_STATE = {
    isLoggedIn : false,
    user : {},
    errors : [],
    token : null,
    isRegistered : false
}

const authSlice = createSlice({
    name:"auth",
    initialState:INITIAL_STATE,
    reducers:{
        clearErrors: (state) => {
            state.errors = [];
        },
        resetRegisterStatus: (state) => {
            state.isRegistered = false;
        }
    },
    extraReducers : (builder)=>{
        builder
            .addCase(loginThunk.fulfilled, (state, action)=>{
                state.isLoggedIn = true;
                state.user = action.payload.data;
            })
            .addCase(loginThunk.rejected, (state, action)=>{
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(registerThunk.pending, (state) => {
                state.isRegistered = false;
                state.errors = [];
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.isRegistered = true;
                state.errors = [];
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.isRegistered = false;
                state.errors = action.payload?.errors || ["Something went wrong!"];
            })
    }
});

export const { clearErrors, resetRegisterStatus } = authSlice.actions;
export default authSlice.reducer;