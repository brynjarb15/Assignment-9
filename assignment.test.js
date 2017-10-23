import * as add from './add';
import { loop } from './index';
import { throws } from './index';

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
});
