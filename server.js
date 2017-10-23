import mongoose, { Schema } from 'mongoose';
import { Employee } from './models';

mongoose.Promise = global.Promise;
mongoose
	.connect('mongodb://brynjar:brynjar@ds121575.mlab.com:21575/bilaverkefni', {
		useMongoClient: true
	})
	.then(db => {
		const server = app(db);
		server.listen(3000, () => console.log('Listening on port 3000'));
	});
