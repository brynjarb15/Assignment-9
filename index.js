import express from 'express';
import mongoose, { Schema } from 'mongoose';
import errorFunction from './errorFunction';
import { add } from './add';
import app from './app';
import { Employee } from './models';

/* DO NOT REFACTOR THIS CODE */

export const throws = n => {
	errorFunction();
	return n;
};

export const loop = n => {
	let sum = 0;
	for (let i = 0; i < n; i++) {
		sum += add(n, n - 1);
	}
	return sum;
};
/* DO NOT REFACTOR THIS CODE */

/* SERVER CODE TO REFACTOR */

/* SERVER CODE TO REFACTOR */
