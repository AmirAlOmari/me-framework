import { Router as NativeRouter } from "express";

import { IAppend } from "./../utils/append.interface";

export abstract class Router {
	public _nativeRouter = NativeRouter();

	constructor(appends: Array<IAppend>) {
		appends.forEach(({ path = "*", handlers }) => {
			if (handlers instanceof Router) {
				this._nativeRouter.use(handlers._nativeRouter);
			} else if (Array.isArray(handlers)) {
				this._nativeRouter.use(path, ...handlers);
			} else {
				throw new Error("No handlers provided");
			}
		});
	}
}
