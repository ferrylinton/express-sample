import { FindResult, Todo } from "@src/types/todo-type";
import { AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { getToken } from "../utils/token-util";
import { sendLog } from "./request-info-service";

export async function find(): Promise<AxiosResponse<FindResult>> {
    const headers = {
        Authorization: getToken()
    }

    sendLog();
    return await axiosInstance.get<FindResult>(`/api/todoes`, { headers })
};

export async function findById(id: string) {
    const headers = {
        Authorization: getToken()
    }

    sendLog();
    return await axiosInstance.get(`/api/todoes/${id}`, { headers })
};

export async function create(task: string) {
    const headers = {
        Authorization: getToken()
    }

    sendLog("post", { task });
    return await axiosInstance.post<Todo | ErrorResponse>(`/api/todoes`, { task }, { headers })
};

export async function update(id: string) {
    const headers = {
        Authorization: getToken()
    }

    sendLog("put");
    return await axiosInstance.put<Todo | ErrorResponse>(`/api/todoes/${id}`, {}, { headers });
};

export async function deleteById(id: string) {
    const headers = {
        Authorization: getToken()
    }

    sendLog("delete");
    return await axiosInstance.delete<Todo | ErrorResponse>(`/api/todoes/${id}`, { headers });
};
