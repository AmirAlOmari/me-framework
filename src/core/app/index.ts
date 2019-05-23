import express from "express";
import { Server } from "http";

import { BaseRouter } from "./../router";
import { IAppend } from "./../utils/append.interface";

export const App = (appends: Array<IAppend>) => (constructor: new () => any) =>
	class extends BaseApp {
		constructor() {
			super();
			appends.forEach(({ path = "*", handlers }) => {
				if (handlers instanceof BaseRouter) {
					this._nativeApp.use(handlers._nativeRouter);
				} else if (Array.isArray(handlers)) {
					this._nativeApp.use(path, ...handlers);
				} else {
					throw new Error("No handlers provided");
				}
			});

			constructor.apply(this);
		}
	};

export abstract class BaseApp {
	public _nativeApp = express();
	public _server?: Server;

	public async listen(port: number, hostname: string = "0.0.0.0"): Promise<Server> {
		return new Promise((resolve, reject) => {
			this._server = this._nativeApp.listen(port, hostname, () => resolve(this._server)).on("error", reject);
		});
	}
}
