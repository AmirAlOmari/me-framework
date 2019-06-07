import { loadEnv } from "./../../src";

loadEnv(["./../.env", "./../.env.example"], __dirname + "./../");

export default {
	MONGO_HOSTNAME: process.env.MONGO_HOSTNAME,
	MONGO_PORT: process.env.MONGO_PORT,

	SERVER_HOSTNAME: process.env.SERVER_HOSTNAME,
	SERVER_PORT: process.env.SERVER_PORT,
};
