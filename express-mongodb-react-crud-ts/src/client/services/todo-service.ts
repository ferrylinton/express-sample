import { AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { FindResult, Todo } from "@src/types/todo-type";
import { getTokenFromMeta } from "../utils/token";



export async function find(): Promise<AxiosResponse<FindResult>> {
    const headers = {
        Authorization: "Bearer " + getTokenFromMeta()
    }

    return await axiosInstance.get<FindResult>(`/api/todoes`, { headers })
};

export async function findById(id: string) {
    const headers = {
        Authorization: "Bearer " + getTokenFromMeta()
    }

    return await axiosInstance.get(`/api/todoes/${id}`, { headers })
};

export async function create(task: string) {
    const headers = {
        Authorization: "Bearer " + getTokenFromMeta()
    }

    return await axiosInstance.post<Todo | ErrorResponse>(`/api/todoes`, { task }, { headers })
};

export async function update(id: string) {
    const headers = {
        Authorization: "Bearer " + getTokenFromMeta()
    }

    return await axiosInstance.put<Todo | ErrorResponse>(`/api/todoes/${id}`, {}, { headers });
};

export async function deleteById(id: string) {
    const headers = {
        Authorization: "Bearer " + getTokenFromMeta()
    }

    return await axiosInstance.delete<Todo | ErrorResponse>(`/api/todoes/${id}`, { headers });
};
