const todoService = require('../services/todo-service');


async function find(_req, res, next) {
    try {
        const todoes = await todoService.find()
        res.status(200).json(todoes);
    } catch (error) {
        next(error);
    }
}

async function findById(req, res, next) {
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

async function create(req, res, next) {
    try {
        const task = req.body.task;
        const done = false;
        const todo = await todoService.create({ task, done });
        res.status(201).json(todo);
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    try {
        const task = req.body.task;
        const done = req.body.done;
        const updateResult = await todoService.update(req.params._id, { task, done });
        res.status(200).json(updateResult)
    } catch (error) {
        next(error);
    }
}

async function deleteById(req, res, next) {
    try {
        const deleteResult = await todoService.deleteById(req.params._id);
        res.status(200).json(deleteResult)
    } catch (error) {
        next(error);
    }
}

module.exports = {
    find,
    findById,
    create,
    update,
    deleteById
};