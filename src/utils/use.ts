import { IHandler } from "./../core/utils/handler.interface";
import { IAppend } from "./../core/utils/append.interface";
import { Router } from "./../core/router";

export const USE = (
	path: string,
	...handlers: Array<IHandler | (new () => Router)>
): IAppend => {
	return {
		path,
		handlers,
	};
};
