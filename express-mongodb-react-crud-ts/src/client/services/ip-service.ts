import axios, { AxiosResponse } from "axios";

export async function getIp(): Promise<AxiosResponse> {
    return await axios.get(`https://api.ipify.org?format=json`)
};
