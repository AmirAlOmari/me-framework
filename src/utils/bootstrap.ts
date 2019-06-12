import { connect } from "mongoose";
import { Express } from "express";
import { Server } from "http";

import { Type } from "./injector";
import { IMongoConfig, IServerConfig } from "./../core/app";

const connectMongo = async (MONGO_URL: string) =>
	connect(
		MONGO_URL,
		{
			useNewUrlParser: true,
			useFindAndModify: false,
			autoReconnect: true,
		}
	);

const listenServer = async (
	app: Express,
	hostname: string,
	port: string | number
): Promise<Server> =>
	new Promise((reoslve, reject) => {
		const server: Server = app
			.listen(Number(port), hostname)
			.on("listening", () => reoslve(server))
			.on("error", reject);
	});

export const bootstrap = async <T>(
	AppCclass: Type<T>,
	{
		MONGO_PROTOCOL = "mongodb://",
		MONGO_USERNAME,
		MONGO_USERPASSWORD,
		MONGO_HOSTNAME = "127.0.0.1",
		MONGO_PORT = "27017",
		MONGO_DBNAME,
	}: IMongoConfig,
	{ SERVER_HOSTNAME = "0.0.0.0", SERVER_PORT }: IServerConfig
) => {
	const MOGNO_CREDENTIALS =
		MONGO_USERNAME && MONGO_USERPASSWORD
			? `${MONGO_USERNAME}:${MONGO_USERPASSWORD}@`
			: "";

	const MONGO_URL = `${MONGO_PROTOCOL}${MOGNO_CREDENTIALS}${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DBNAME}`;

	const app = new AppCclass();

	return Promise.resolve()
		.then(() => connectMongo(MONGO_URL))
		.then(() =>
			listenServer(
				<Express>(<any>app)._router,
				SERVER_HOSTNAME,
				SERVER_PORT
			)
		);
};
