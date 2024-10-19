import { Pageable, RequestParams } from "@src/types/common-type";
import { RequestInfo } from "@src/types/request-info";
import { AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { getToken } from "../utils/token-util";
import { getIp } from "./ip-service";

let processing = false;

export async function find(params : RequestParams): Promise<AxiosResponse<Pageable<RequestInfo>>> {
    const headers = {
        Authorization: getToken()
    }

    return await axiosInstance.get<Pageable<RequestInfo>>(`/api/requestinfos`, { params, headers })
};

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

        axiosInstance.post<Omit<RequestInfo, "id">>(`/api/requestinfos`, { app, method, url, ip, userAgent, data }, { headers })
            .catch(error => {
                console.log(error);
            }).finally(() => {
                processing = false;
            })
    }

}