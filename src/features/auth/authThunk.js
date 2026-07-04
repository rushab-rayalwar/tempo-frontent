// third party imports
import { createAsyncThunk } from "@reduxjs/toolkit";

// local imports
import api from "../../services/api.js";

const authThunk = createAsyncThunk(
    'auth/login',
    async ( credentials , thunkAPI )=>{
        try {
            let response = await api.post(import.meta.VITE_API_BASE_URL+"http://localhost:3200/api/user/login");
            console.log('RESPONSE', response);
            return response;
        } catch(error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export default authThunk;