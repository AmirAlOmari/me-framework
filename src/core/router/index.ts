import { Router as NativeRouter } from "express";

import { IAppend } from "./../utils/append.interface";

export const Router = (appends: Array<IAppend>) => (constructor: new () => any) =>
	class extends BaseRouter {
		constructor() {
			super();

			appends.forEach(({ path = "*", handlers }) => {
				if (handlers instanceof BaseRouter) {
					this._nativeRouter.use(handlers._nativeRouter);
				} else if (Array.isArray(handlers)) {
					this._nativeRouter.use(path, ...handlers);
				} else {
					throw new Error("No handlers provided");
				}
			});

			constructor.apply(this);
		}
	};

export abstract class BaseRouter {
	public _nativeRouter = NativeRouter();
}
