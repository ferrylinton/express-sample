import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "/",
    //baseURL: 'http://localhost:5000',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 30000,
    timeoutErrorMessage: "Time out!",
});

