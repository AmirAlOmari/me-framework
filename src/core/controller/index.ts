export abstract class Controller {
	constructor() {}

	protected bind(thisArg: any) {
		Object.getOwnPropertyNames(thisArg).forEach(prop => {
			if (typeof thisArg[prop] === "function") {
				thisArg[prop] = thisArg[prop].bind(thisArg);
			}
		});
	}
}
