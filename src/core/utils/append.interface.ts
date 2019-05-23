import { BaseRouter } from "./../router";
import { IHandler } from "./handler.interface";

export interface IAppend {
	path?: string;
	handlers?: Array<IHandler> | BaseRouter;
}
