import express, { Express } from "express";
import { Server } from "http";
import { connect } from "mongoose";
import { json as jsonParser, OptionsJson } from "body-parser";

import { Routable, LocalAppender } from "../utils";
import {
	GenericClassDecorator,
	InjectionRule,
	Injector,
} from "../../utils/injector";

export interface IMongoConfig {
	MONGO_PROTOCOL?: string;
	MONGO_USERNAME?: string;
	MONGO_USERPASSWORD?: string;
	MONGO_HOSTNAME?: string;
	MONGO_PORT?: string;
	MONGO_DBNAME: string;
}

export interface IServerConfig {
	SERVER_PORT: number | string;
	SERVER_HOSTNAME?: string;
}

export interface IAppConfig {
	json?: boolean | OptionsJson;
	// locals?: LocalType;
}

export const App = <T>(
	appConfig: IAppConfig = {}
): GenericClassDecorator<T> => constructor => {
	const injectionRule = (appRef: Express): InjectionRule => token => {
		switch (token) {
			case AppRef:
				return appRef as any;
				break;

			default:
				break;
		}
	};

	const configJSONBodyParserAppender = (appRef: Express) => {
		if (
			!appConfig.json &&
			(appConfig.json === null || appConfig.json === undefined)
		) {
			appConfig.json = true;
		}

		if (appConfig.json === true) {
			appRef.use(jsonParser());
		} else if (appConfig.json && typeof appConfig.json === "object") {
			appRef.use(jsonParser(appConfig.json));
		}
	};

	const configAppender = (instance: T, appRef: Express) => {
		configJSONBodyParserAppender(appRef);
	};

	const newConstructor = function(...args: Array<any>): T {
		if (!new.target) {
			throw new Error("Instance have to be created with 'new' keyword");
		}

		const appRef = express();

		const instance = Injector.resolve<T>(
			constructor,
			injectionRule(appRef)
		);

		configAppender(instance, appRef);

		return instance;
	};

	return newConstructor;
};

export class AppRef {}

// export abstract class App extends Routable {
// 	private _server?: Server;

// 	constructor(private _exApp: Express = express()) {
// 		super(_exApp);
// 	}

// 	/**
// 	 * @
// 	 */
// 	public bootstrap(MONGO_CONFIG: IMongoConfig, SERVER_CONFIG: IServerConfig) {
// 		return Promise.resolve()
// 			.then(() => this.connect(MONGO_CONFIG))
// 			.then(() => this.listen(SERVER_CONFIG));
// 	}

// 	/**
// 	 * Sets the provided config
// 	 *
// 	 * @param param config
// 	 */
// 	protected config<LocalType extends object>({
// 		json,
// 		locals,
// 	}: IAppConfig<LocalType>) {
// 		if (typeof json === "boolean" && json === true) {
// 			this.use("*", jsonParser());
// 		} else if (typeof json === "object" && !Array.isArray(json)) {
// 			this.use("*", jsonParser(json));
// 		}

// 		if (locals) {
// 			this.use("*", LocalAppender<LocalType>());
// 		}
// 	}

// 	/**
// 	 * Binds application on the provided port and hostname
// 	 *
// 	 * @param port port to bind on
// 	 * @param hostname hostname to bind on
// 	 */
// 	private async listen({
// 		SERVER_PORT,
// 		SERVER_HOSTNAME = "0.0.0.0",
// 	}: IServerConfig): Promise<Server> {
// 		return new Promise((resolve, reject) => {
// 			this._server = this._exApp
// 				.listen(Number(SERVER_PORT), SERVER_HOSTNAME, () =>
// 					resolve(this._server)
// 				)
// 				.on("error", reject);
// 		});
// 	}

// 	/**
// 	 * Connects to `mongod` instance with provided configuration
// 	 *
// 	 * @default "mongodb://127.0.0.1:27017/${MONGO_DBNAME}"
// 	 *
// 	 * @param param connect configuration
// 	 */
// 	private async connect({
// 		MONGO_PROTOCOL = "mongodb://",
// 		MONGO_USERNAME = "",
// 		MONGO_USERPASSWORD = "",
// 		MONGO_HOSTNAME = "127.0.0.1",
// 		MONGO_PORT = "27017",
// 		MONGO_DBNAME,
// 	}: IMongoConfig) {
// 		const MONGO_CREDENTIALS =
// 			MONGO_USERNAME && MONGO_USERPASSWORD
// 				? `${MONGO_USERNAME}:${MONGO_USERPASSWORD}@`
// 				: "";

// 		const MONGO_URL = `${MONGO_PROTOCOL}${MONGO_CREDENTIALS}${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DBNAME}`;

// 		return connect(
// 			MONGO_URL,
// 			{
// 				useNewUrlParser: true,
// 				useFindAndModify: false,
// 				autoReconnect: true,
// 			}
// 		);
// 	}
// }
