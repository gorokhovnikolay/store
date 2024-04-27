export const debounce = (fn, delay) => {
	let counter;
	return (...args) => {
		clearTimeout(counter);
		counter = setTimeout(fn, delay, ...args);
	};
};
