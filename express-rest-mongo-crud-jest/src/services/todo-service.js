const { ObjectId } = require('mongodb');
const { getCollection } = require('../configs/mongodb');

const TODO_COLLECTION = 'todo'

const find = async () => {
    const todoCollection = await getCollection(TODO_COLLECTION);
    return todoCollection.find({done: false}).sort({ 'task': -1 }).toArray();
}

const findById = async (_id) => {
    const todoCollection = await getCollection(TODO_COLLECTION);
    return await todoCollection.findOne({ _id: new ObjectId(_id) });
}

const create = async (todo) => {
    const todoCollection = await getCollection(TODO_COLLECTION);
    const insertOneResult = await todoCollection.insertOne(todo);
    return {...todo, _id: insertOneResult.insertedId };
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