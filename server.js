import mongoose, { Schema } from 'mongoose';
import { Employee } from './models';

mongoose.Promise = global.Promise;
mongoose
	.connect('mongodb://<my-db>@ds121575.mlab.com:1337/veft', {
		useMongoClient: true
	})
	.then(db => {
		const server = app(db);
		server.listen(3000, () => console.log('Listening on port 3000'));
	});
