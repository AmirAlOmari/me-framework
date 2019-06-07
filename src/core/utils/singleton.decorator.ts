export const Singleton = (...args: Array<any>) =>
	function<T extends ClassDecorator>(constructor: T) {
		console.log(constructor, this instanceof constructor);
	};
