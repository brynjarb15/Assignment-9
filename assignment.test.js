import * as add from './add';
import { loop } from './index';

describe('index', () => {
	describe('loop', () => {
		test('should call add 3 times', () => {
			const addSpy = jest.spyOn(add, 'add');
			loop(3);
			expect(addSpy).toHaveBeenCalledTimes(3);
		});
	});
});
