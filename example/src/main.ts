import { ProjectApp } from "./project.app";
import config from "./config";
const { MONGO_URL, SERVER_URL } = config;

const app = new ProjectApp();

app.bootstrap(MONGO_URL, SERVER_URL).then(() => console.log(`Server is listening on ${SERVER_URL}`));
