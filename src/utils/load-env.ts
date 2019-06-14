import { existsSync } from "fs";
import { resolve } from "path";
import { config } from "dotenv";

export const loadEnv = (
	envFilePaths: Array<string>,
	basePath: string = resolve(__dirname, "./../../../../")
) => {
	let foundPath: string = "";

	envFilePaths.forEach(envFilePath => {
		envFilePath = resolve(basePath, envFilePath);
		if (existsSync(envFilePath)) {
			foundPath = envFilePath;

			config({ path: foundPath });
		}
	});
};
