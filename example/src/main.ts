import { ProjectApp } from "./project.app";
import config from "./config";

const { MONGO_HOSTNAME, MONGO_PORT, SERVER_HOSTNAME, SERVER_PORT } = config;

const app = new ProjectApp();

app.bootstrap(
	{ MONGO_DBNAME: "my-awesome-project" },
	{ SERVER_PORT: "3000" }
).then(server => {
	console.log(`Server is listening on ${SERVER_HOSTNAME}:${SERVER_PORT}`);
});
