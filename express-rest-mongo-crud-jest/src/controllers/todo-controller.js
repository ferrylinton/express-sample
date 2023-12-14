const todoService = require('../services/todo-service');

/**
 * A controller that handles CRUD operations of Todo's data
 * @author ferrylinton
 * @module TodoController
 */

/**
 * Get list of todoes
 */
exports.find = async (req, res, next) => {
    try {
        const todoes = await todoService.find()
        res.status(200).json(todoes);
    } catch (error) {
        next(error);
    }
};

/**
 * Get todo by ID
 */
exports.findById = async (req, res, next) => {
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
};

/**
 * Create new todo
 */
exports.create = async (req, res, next) => {
    try {
        const todo = await todoService.create(req.body.task);
        res.status(201).json(todo);
    } catch (error) {
        next(error);
    }
};

/**
 * Update todo
 */
exports.update = async (req, res, next) => {
    try {
        const { task, done } = req.body;
        const updateResult = await todoService.update(req.params._id, { task, done });
        res.status(200).json(updateResult)
    } catch (error) {
        next(error);
    }
};

/**
 * Delete todo by ID
 */
exports.deleteById = async (req, res, next) => {
    try {
        const deleteResult = await todoService.deleteById(req.params._id);
        res.status(200).json(deleteResult)
    } catch (error) {
        next(error);
    }
};