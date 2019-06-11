import { Type } from "./injector";
import { IMongoConfig, IServerConfig } from "./../core/app";

export const bootstrap = <T>(
	AppCclass: Type<T>,
	MONGO_CONFIG: IMongoConfig,
	SERVER_CONFIG: IServerConfig
) => {
	const app = new AppCclass();

	console.log(app);
};
