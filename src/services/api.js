// third party imports
import axios from "axios";

// local imports


const api = axios.create({
    baseURL : import.meta.env.VITE_API_BASE_URL,
    headers : {
        "Content-Type" : "application/json"
    }
});

export default api;