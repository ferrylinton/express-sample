import { equal, strictEqual } from 'assert';
import { create, deleteById, find, findById, update } from '../../src/services/todo-service';
import { startMongoServer, stopMongoServer } from '../libs/mongo-test-util';

beforeAll(async () => {
	await startMongoServer();
});

afterAll(async () => {
	await stopMongoServer();
});

describe('todoService', () => {
	let _id: string;

	test('find all data', async () => {
		const todoes = await find();
		strictEqual(todoes.length, 0);
	});

	test('create new task', async () => {
		const result = await create('Create node application');
		_id = result.insertedId.toHexString();
		equal(result.acknowledged, true);

		const todoes = await find();
		equal(todoes.length, 1);
	});

	test('find data by id', async () => {
		const todo = await findById(_id);
		equal(todo?._id, _id);
	});

	test('update data by id', async () => {
		const result = await update(_id, { done: true });
		equal(result.modifiedCount, 1);

		const todo = await findById(_id);
		equal(todo?.done, true);
	});

	test('delete data by id', async () => {
		const result = await deleteById(_id);
		equal(result.deletedCount, 1);

		const todo = await findById(_id);
		equal(todo, null);
	});
});
