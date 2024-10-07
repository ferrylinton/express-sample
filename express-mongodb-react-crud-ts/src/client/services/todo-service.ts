import { AxiosResponse } from "axios";
import { axiosInstance } from "../utils/axios";
import { FindResult, Todo } from "../../types/todo-type";
import { getTokenFromMeta } from "../utils/token";



export async function find(): Promise<AxiosResponse<FindResult>> {
    const headers = {
        Authorization: "Bearer " + getTokenFromMeta()
    }
    
    return await axiosInstance.get<FindResult>(`/api/todoes`, { headers })
};

export async function findById(id: string) {
    return await axiosInstance.get(`/api/todoes/${id}`)
};

export async function create(task: string) {
    return await axiosInstance.post<Todo | ErrorResponse>(`/api/todoes`, { task })
};

export async function update(id: string) {
    return await axiosInstance.put<Todo | ErrorResponse>(`/api/todoes/${id}`, { done: true })
};

export async function deleteById(id: string) {
    return await axiosInstance.delete<Todo | ErrorResponse>(`/api/todoes/${id}`)
};
