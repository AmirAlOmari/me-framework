import { IMongoConfig, IServerConfig, bootstrap } from "../../";

import { ProjectApp } from "./project.app";
import config from "./config";

const {
	MONGO_HOSTNAME,
	MONGO_PORT,
	MONGO_DBNAME,
	SERVER_HOSTNAME,
	SERVER_PORT,
} = config;

const MONGO_CONFIG: IMongoConfig = {
	MONGO_HOSTNAME,
	MONGO_PORT,
	MONGO_DBNAME,
};

const SERVER_CONFIG: IServerConfig = {
	SERVER_HOSTNAME,
	SERVER_PORT,
};

bootstrap(ProjectApp, MONGO_CONFIG, SERVER_CONFIG).then(() => {
	console.log(`Listening on '${SERVER_HOSTNAME}:${SERVER_PORT}'`);
});
