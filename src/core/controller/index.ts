export const Controller = () => (constructor: new () => any) => {
	for (const key in constructor.prototype) {
		if (constructor.prototype.hasOwnProperty(key)) {
			if (typeof constructor.prototype[key] === "function") {
				// tslint:disable-next-line: only-arrow-functions
				constructor.prototype[key] = function(...args: Array<any>) {
					return constructor.prototype[key].apply(this);
				};
			}
		}
	}
};
