import * as todoService from '@src/services/todo-service';
import { CreateTodoSchema } from '@src/validations/TodoSchema';
import express, { NextFunction, Request, Response } from 'express';


const viewListHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id, op } = req.query;

    try {

        const todoes = await todoService.find();
        const total = await todoService.count();
        res.render('home', {
            todoes,
            total
        });
    } catch (error) {
        console.log(error);
        res.render('home', {
            error,
            id,
            op
        });
    }
}

const addOrDetailHandler = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.addOrDetail;
    let view: string = id === "add" ? "add" : "detail";
    let options = undefined;

    try {
        if (id !== "add") {
            const todo = await todoService.findById(id);
            options = {
                todo
            }
        }
    } catch (error) {
        console.log(error);
        options = {
            error
        }
    }

    res.render(view, options);
}

const addTodoHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const validation = CreateTodoSchema.safeParse(req.body);

        if (validation.success) {
            let task = req.body.task;
            await todoService.create(task);
            res.redirect('/');
        }else{
            const errorValidations = validation.error.issues;
            console.log(errorValidations);
            res.render('add', {
                errorValidations
            });
        }
        
    } catch (error) {
        next(error);
    }
}

const updateTodoHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        const current = await todoService.findById(id);
        if (current) {
            await todoService.update(id, { task: current.task, done: true })
        }

        res.status(200).json({ message: "OK" });
    } catch (error) {
        next(error);
    }
}

const deleteTodoHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        await todoService.deleteById(id)
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
router.get('/:addOrDetail', addOrDetailHandler);
router.post('/', addTodoHandler);
router.put('/:id', updateTodoHandler);
router.delete('/:id', deleteTodoHandler);

export default router;