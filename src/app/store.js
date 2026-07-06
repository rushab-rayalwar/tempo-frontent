// third party imports
import { configureStore } from "@reduxjs/toolkit";

// local imports
import authReducer from "../features/auth/authSlice.js";

const store = configureStore({
    reducer : {
        auth: authReducer
    }
});

export default store;
