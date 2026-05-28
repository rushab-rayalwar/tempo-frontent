// third party imports
import axios from "axios";

// local imports


const api = axios.create({
    baseURL : "http://localhost:3200/api",
    headers : {
        "Content-Type" : "application/json"
    }
});

export default api;