import { axiosInstance } from "../utils/axios";
import { getToken } from "../utils/token-util";
import { getIp } from "./ip-service";

let processing = false;

export const sendLog = async (method = "get", data?: any) => {
    if (!processing) {
        processing = true;

        const headers = {
            Authorization: getToken()
        }

        const app = "express-logger";
        const url = window.location.href;
        const ip = await getIp();
        const userAgent = navigator.userAgent;

        axiosInstance.post<Omit<RequestInfo, "id">>(`/api/requestinfo`, { app, method, url, ip, userAgent, data }, { headers })
            .catch(error => {
                console.log(error);
            }).finally(() => {
                processing = false;
            })
    }

}