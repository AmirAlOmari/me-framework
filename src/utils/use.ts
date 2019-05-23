import { IHandler } from "./../core/utils/handler.interface";

export const USE = (path: string, ...handlers: Array<IHandler>) => {
	return {
		path,
		handlers,
	};
};
