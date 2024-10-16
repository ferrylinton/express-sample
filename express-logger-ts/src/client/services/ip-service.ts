import axios, { AxiosResponse } from "axios";

export async function getIp(): Promise<AxiosResponse> {
    try {
        const { data } = await axios.get(`https://api.ipify.org?format=json`);
        return data.ip;
    } catch (error: any) {
        return error.message
    }
};
