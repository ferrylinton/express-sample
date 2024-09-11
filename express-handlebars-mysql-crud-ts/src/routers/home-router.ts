import { NODE_ENV } from '@src/config/env-constant';
import * as todoService from '@src/services/todo-service';
import express, { NextFunction, Request, Response } from 'express';


const viewListHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todoes = [
            {
                "created_at": "2024-08-23T04:27:24.000Z",
                "done": 0,
                "id": "1cc57b6a-af81-4536-91a9-5ee2353a702e",
                "task": "Berli mainan yang banyak Berli mainan yang banyak",
                "updated_at": null
            }
        ];
        console.log(JSON.stringify(todoes));
        res.render('home', {
            todoes,
            NODE_ENV,
            message: "Salam perdamaian !!"
        });
    } catch (error) {
        next(error);
    }
}

const addOrDetailHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const addOrDetail: string = req.params.addOrDetail;

        console.log(addOrDetail);

        if (addOrDetail === "add") {
            res.render('add', {
                message: "Salam perdamaian !!"
            });
        } else {
            res.render('detail', {
                todo: {
                    "created_at": "2024-08-23T04:27:24.000Z",
                    "done": 0,
                    "id": "1cc57b6a-af81-4536-91a9-5ee2353a702e",
                    "task": "Berli mainan yang banyak Berli mainan yang banyak",
                    "updated_at": null
                }
            });
        }

    } catch (error) {
        next(error);
    }
}

const viewDetailHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {

        res.render('add', {
            message: "Salam perdamaian !!"
        });
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

export default router;