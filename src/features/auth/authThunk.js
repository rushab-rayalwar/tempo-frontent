// third party imports
import { createAsyncThunk } from "@reduxjs/toolkit";

// local imports
import api from "../../services/api.js";

const loginThunk = createAsyncThunk(
    'auth/login',
    async ( credentials , thunkAPI )=>{
        try {
            let response = await api.post(import.meta.VITE_API_BASE_URL+"/api/user/login", credentials);
            console.log('RESPONSE', response);
            return response;
        } catch(error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const registerThunk = createAsyncThunk(
    'auth/register',
    async ( userData, thunkAPI ) => {
        try {
            const response = await api.post("/api/user/register", userData);
            console.log('REGISTER RESPONSE', response);
            return response.data;
        } catch(error) {
            if (error.response && error.response.data) {
                return thunkAPI.rejectWithValue(error.response.data);
            }
            return thunkAPI.rejectWithValue({ success: false, errors: ["Something went wrong!"] });
        }
    }
);

export { loginThunk, registerThunk };