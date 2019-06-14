import { loadEnv } from "./../..";

loadEnv(["./../.env", "./../.env.example"], __dirname + "./../");

export default {
	MONGO_HOSTNAME: process.env.MONGO_HOSTNAME || "127.0.0.1",
	MONGO_PORT: process.env.MONGO_PORT || "27017",
	MONGO_DBNAME: process.env.MONGO_DBNAME || "dbname-amir",

	SERVER_HOSTNAME: process.env.SERVER_HOSTNAME || "0.0.0.0",
	SERVER_PORT: process.env.SERVER_PORT || "3000",
};
