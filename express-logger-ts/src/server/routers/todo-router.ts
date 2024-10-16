import express, { NextFunction, Request, Response } from 'express';
import * as todoService from '@src/server/services/todo-service';
import { CreateTodoSchema } from '@src/server/validations/TodoSchema';

/**
 * A router that handles Todo REST API
 * @author ferrylinton
 * @module TodoRouter
 */

/**
 * Handler for Endpoint GET /todoes
 * @param req {Object} The request.
 * @param req.query.name {String} The name query.
 * @param res {Object} The response.
 * @param {Function} next
 */
const getTodoesHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todoes = await todoService.find();
        res.status(200).json(todoes);
    } catch (error) {
        next(error);
    }
}

/**
 * Handler for Endpoint POST /todoes
 * @param req {Object} The request.
 * @param req.body.task {String} The task.
 * @param res {Object} The response.
 * @param {Function} next
 */
const postTodoHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const total = await todoService.count();

        if (total >= 20) {
            res.status(400).json({
                errorMaxData: "errorMaxData"
            });
        } else {
            const validation = CreateTodoSchema.safeParse(req.body);

            if (validation.success) {
                const todo = await todoService.create(req.body.task);
                res.status(201).json(todo);
            } else {
                const errorValidations = validation.error.issues;
                res.status(400).json(errorValidations);
            }
        }


    } catch (error) {
        next(error);
    }
}

/**
 * Handler for Endpoint GET /todoes/:_id
 * @param req {Object} The request.
 * @param req.params._id {String} Todo Id.
 * @param res {Object} The response.
 * @param {Function} next
 */
const getTodoByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todo = await todoService.findById(req.params._id);
        if (todo) {
            res.status(200).json(todo);
        } else {
            res.status(404).json({ message: "Data is not found" });
        }
    } catch (error) {
        next(error);
    }
}

/**
 * Handler for Endpoint PUT /todoes/:_id
 * @param req {Object} The request.
 * @param req.params._id {String} Todo Id.
 * @param res {Object} The response.
 * @param {Function} next
 */
const putTodoHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updateResult = await todoService.update(req.params._id);
        res.status(200).json(updateResult)
    } catch (error) {
        next(error);
    }
}

/**
 * Handler for Endpoint DELETE /todoes/:_id
 * @param req {Object} The request.
 * @param req.params._id {String} Todo Id.
 * @param res {Object} The response.
 * @param {Function} next
 */
const deleteTodoHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deleteResult = await todoService.deleteById(req.params._id);
        res.status(200).json(deleteResult)
    } catch (error) {
        next(error);
    }
}

/**
 * Create instance of Express.Router
 */
const router = express.Router();

router.get('/todoes', getTodoesHandler);
router.post('/todoes', postTodoHandler);
router.get("/todoes/:_id", getTodoByIdHandler);
router.put("/todoes/:_id", putTodoHandler);
router.delete("/todoes/:_id", deleteTodoHandler);

export default router;