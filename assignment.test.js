import * as add from './add';
import { loop } from './index';
import { Employee } from './models';
import mongoose from 'mongoose';
import request from 'supertest';
import mongo from 'mongodb-memory-server';
import app from './app.js';

mongoose.Promise = global.Promise;
let mongoServer;
let server;

beforeAll(() => {
	return new Promise((resolve, reject) => {
		mongoServer = new mongo();
		mongoServer.getConnectionString().then(mongoUri => {
			mongoose
				.connect(mongoUri, {
					useMongoClient: true
				})
				.then(db => {
					server = app(db);
					resolve();
				});
		});
	});
});

afterEach(() => {
	return new Promise((resolve, reject) => {
		Employee.deleteMany({}, (err, data) => {
			resolve();
		});
	});
});

describe('index', () => {
	describe('loop', () => {
		test('should call add 3 times', () => {
			const addSpy = jest.spyOn(add, 'add');
			loop(3);
			expect(addSpy).toHaveBeenCalledTimes(3);
		});
	});

	describe('db', () => {
		test('should return empty array', done => {
			request(server)
				.get('/')
				.then(res => {
					expect(res.body).toEqual({ data: [] });
					done();
				});
		});
	});
});
