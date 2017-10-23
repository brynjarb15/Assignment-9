import * as add from './add';
import { loop, throws } from './index';
import { Employee } from './models';
import mongoose from 'mongoose';
import request from 'supertest';
import mongo from 'mongodb-memory-server';
import app from './app.js';
import * as errorFunction from './errorFunction';

mongoose.Promise = global.Promise;
let mongoServer;
let server;

// Helper function
const createEmployees = (n, cb) => {
	let promises = [];
	for (let i = 0; i < n; i++) {
		promises.push(
			new Promise((resolve, reject) => {
				new Employee({ name: 'Bob', jobTitles: ['worker'] })
					.save((err, employee) => {
						if (err) {
							console.log('--error--');
						}
					})
					.then(res => {
						resolve();
					});
			})
		);
	}
	Promise.all(promises).then(cb);
};

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
	describe('add', () => {
		test('Should return correct sum for 1 + 1', () => {
			expect(add.add(1, 1)).toBe(2);
		});

		test('Should return correct sum for null + 1', () => {
			expect(add.add(null, 1)).toBe(1);
		});

		test('should return not a number when calling add with no parameters', () => {
			expect(add.add()).tobeNan;
		});
	});

	describe('loop', () => {
		test('should call add 3 times', () => {
			const addSpy = jest.spyOn(add, 'add');
			loop(3);
			expect(addSpy).toHaveBeenCalledTimes(3);
		});
	});

	describe('throw', () => {
		test('should return 3 if 3 is used', () => {
			errorFunction.default = jest.fn();
			throws(3, n => {
				expect(n).toBe(3);
			});
		});
	});

	describe('db', () => {
		test('should return empty array', done => {
			request(server)
				.get('/')
				.expect(200)
				.then(res => {
					expect(res.body).toEqual({ data: [] });
					done();
				});
		});

		test('should have the name Bob', done => {
			new Employee({ name: 'Bob', jobTitles: ['worker'] }).save((err, employee) => {
				if (err) {
					console.log('--error--');
				}
			});
			new Employee({ name: 'Bob2', jobTitles: ['builder', 'boss'] }).save((err, employee) => {
				if (err) {
					console.log('--error--');
				}
			});
			request(server)
				.get('/')
				.expect(200)
				.then(res => {
					expect(res.body.data[0].name).toEqual('Bob');
					done();
				});
		});

		test('should have 20 employees', done => {
			createEmployees(20, () => {
				request(server)
					.get('/')
					.expect(200)
					.then(res => {
						console.log(res.body.data.length);
						expect(res.body.data.length).toBe(20);
						done();
					});
			});
		});
	});
});
