import express from "express";
import { Server } from "http";
import { connect } from "mongoose";

import { Router } from "./../router";
import { IAppend } from "./../utils/append.interface";

export abstract class App {
	public _nativeApp = express();
	public _server?: Server;

	constructor(appends: Array<IAppend>) {
		appends.forEach(({ path = "*", handlers }) => {
			if (handlers instanceof Router) {
				this._nativeApp.use(handlers._nativeRouter);
			} else if (Array.isArray(handlers)) {
				this._nativeApp.use(path, ...handlers);
			} else {
				throw new Error("No handlers provided");
			}
		});
	}

	public async listen(port: number | string, hostname: string = "0.0.0.0"): Promise<Server> {
		return new Promise((resolve, reject) => {
			this._server = this._nativeApp
				.listen(Number(port), hostname, () => resolve(this._server))
				.on("error", reject);
		});
	}

	public async bootstrap(MONGO_URL: string, SERVER_URL: string): Promise<Server> {
		return new Promise((resolve, reject) => {
			connect(
				MONGO_URL,
				{ useFindAndModify: false, useNewUrlParser: true }
			)
				.then(() => {
					const [hostname, port] = SERVER_URL.split(":");
					return this.listen(port, hostname);
				})
				.then(resolve)
				.catch(reject);
		});
	}
}
