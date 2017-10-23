import express from 'express';
import { Employee } from './models';

export default db => {
	const app = express();
	app.get('/', (req, res) => {
		Employee.find({}).exec((err, data) => res.json({ data }));
	});
	return app;
};
