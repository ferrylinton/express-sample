import { ObjectId } from "mongodb"

export type Todo = {
    _id?: ObjectId,
    task: string,
    done: boolean,
    createdAt: Date,
    updatedAt: Date | null
}

export type UpdateTodo = {
    task?: string,
    done?: boolean
}