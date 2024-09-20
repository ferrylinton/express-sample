import * as todoService from '@src/services/todo-service';
import { CreateTodoSchema } from '@src/validations/TodoSchema';
import express, { NextFunction, Request, Response } from 'express';

const NEW_TODO = "newTodo";
const MESSAGE = "message";

const viewListHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todoes = await todoService.find();
        const total = await todoService.count();
        const newTodo = req.cookies[NEW_TODO];
        const message = req.cookies[MESSAGE];

        res.cookie(NEW_TODO, '', { expires: new Date(0) });
        res.cookie(MESSAGE, '', { expires: new Date(0) });

        res.render('home', {
            todoes,
            total,
            message,
            newTodo
        });
    } catch (error) {
        next(error);
    }
}

const viewDetailHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        const todo = await todoService.findById(id);
        res.render("detail", {
            todo
        });
    } catch (error) {
        next(error);
    }
}

const viewAddFormHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.render("add");
    } catch (error) {
        next(error);
    }
}

const addTodoHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const total = await todoService.count();

        if (total >= 20) {
            res.render('add', {
                errorMaxData: "maxData"
            });
        } else {
            const validation = CreateTodoSchema.safeParse(req.body);

            if (validation.success) {
                let task = req.body.task;
                const todo = await todoService.create(task);
                res.cookie(MESSAGE, res.__("dataIsSaved", task), { maxAge: 3000, httpOnly: true });
                res.cookie(NEW_TODO, todo, { maxAge: 3000, httpOnly: true });
                res.redirect('/');
            } else {
                const errorValidations = validation.error.issues;
                res.render('add', {
                    errorValidations
                });
            }
        }

    } catch (error) {
        res.render('add', {
            error
        });
    }
}

const updateTodoHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        const current = await todoService.findById(id);

        if (current) {
            await todoService.update(id, { task: current.task, done: true });
            res.cookie(MESSAGE, res.__("dataIsUpdated", current.task), { maxAge: 3000, httpOnly: true });
        }

        res.status(200).json({ message: "OK" });
    } catch (error) {
        next(error);
    }
}

const deleteTodoHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        const current = await todoService.findById(id);

        if (current) {
            await todoService.deleteById(id);
            res.cookie(MESSAGE, res.__("dataIsDeleted", current.task), { maxAge: 3000, httpOnly: true });
        }

        res.status(200).json({ message: "OK" });
    } catch (error) {
        next(error);
    }
}


/**
 * Create instance of Express.Router
 */
const router = express.Router();

router.get('/', viewListHandler);
router.get('/todo/detail/:id', viewDetailHandler);
router.get('/todo/add', viewAddFormHandler);
router.post('/todo/add', addTodoHandler);
router.put('/api/todo/:id', updateTodoHandler);
router.delete('/api/todo/:id', deleteTodoHandler);

export default router;