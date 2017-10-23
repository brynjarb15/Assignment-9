import mongoose, { Schema } from 'mongoose';

export const Employee = mongoose.model(
	'employee',
	new Schema({
		name: String,
		jobTitles: { type: [String] }
	})
);
