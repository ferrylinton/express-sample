import { ObjectId } from "mongodb"

export type Todo = {
    _id?: ObjectId,
    id?: string,
    task: string,
    done: boolean,
    createdAt: string,
    updatedAt?: string
}

export type UpdateTodo = {
    task?: string,
    done?: boolean
}

export type FindResult = {
    todoes: Todo[],
    total: number
}