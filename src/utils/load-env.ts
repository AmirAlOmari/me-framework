import { existsSync } from "fs";
import { resolve } from "path";
import { config } from "dotenv";

const errorName = "FILE_FOUND_SUCCESSFULLY";

export const loadEnv = (
	envFilePaths: Array<string>,
	basePath: string = resolve(__dirname, "./../../../../")
) => {
	let foundPath: string = "";

	try {
		envFilePaths.forEach(envFilePath => {
			envFilePath = resolve(basePath, envFilePath);
			if (existsSync(envFilePath)) {
				foundPath = envFilePath;
				throw new Error(errorName);
			}
		});
	} catch (error) {
		if ((<Error>error).message !== errorName) {
			throw error;
		}
	}

	config({ path: foundPath });
};
