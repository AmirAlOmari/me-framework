import express, { Express } from "express";
import { json as jsonParser, OptionsJson } from "body-parser";

import { Routable } from "../utils";
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
	// state?: LocalType;
}

export const App = <T = any>(
	appConfig: IAppConfig = {}
): GenericClassDecorator<T> => constructor => {
	const injectionRule = (appRef: AppRef): InjectionRule => token => {
		switch (token) {
			case <any>AppRef:
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

		const _exApp = express();
		const appRef = new AppRef(_exApp);

		_exApp.use((req: any, res: any, next: any) => {
			req.state = req.state ? req.state : {};
			next();
		});

		const instance = Injector.resolve<T>(
			constructor,
			injectionRule(appRef)
		);

		(<any>instance)._router = _exApp;

		configAppender(instance, _exApp);

		return instance;
	};

	newConstructor._isRoutable = true;

	return newConstructor;
};

export class AppRef extends Routable {
	constructor(protected _router: Express) {
		super(_router);
	}
}
