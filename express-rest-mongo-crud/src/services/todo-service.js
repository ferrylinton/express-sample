const { ObjectId } = require('mongodb');
const { getCollection } = require('../configs/mongodb');

const TODO_COLLECTION = 'todo'

const find = async () => {
    const todoCollection = await getCollection(TODO_COLLECTION);
    const cursor = todoCollection.find().sort({ 'task': -1 });

    const todos = [];
    for await (const doc of cursor) {
        todos.push(doc);
    }

    return todos;
}

const findById = async (_id) => {

    const todoCollection = await getCollection(TODO_COLLECTION);
    const todo = await todoCollection.findOne({ _id: new ObjectId(_id) });

    if (todo) {
        const { _id, ...rest } = todo;
        return { id: _id, ...rest };
    }

    return null;
}

const create = async (todo) => {
    const todoCollection = await getCollection(TODO_COLLECTION);
    const insertOneResult = await todoCollection.insertOne(todo);
    return { _id: insertOneResult.insertedId, ...todo };
}

const update = async (_id, todo) => {
    const todoCollection = await getCollection(TODO_COLLECTION);
    return await todoCollection.updateOne({ _id: new ObjectId(_id) }, { $set: todo });
}


const deleteById = async (_id) => {
    const todoCollection = await getCollection(TODO_COLLECTION);
    return await todoCollection.deleteOne({ _id: new ObjectId(_id) });
}

module.exports = {
    find,
    findById,
    create,
    update,
    deleteById
};