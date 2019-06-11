import { Router as NativeRouter } from "express";

import { Routable } from "../utils/routable.cclass";
import { GenericClassDecorator, Injector } from "../../utils/injector";

// export abstract class Router extends Routable {
// 	constructor(public _exRouter = NativeRouter()) {
// 		super(_exRouter);
// 	}
// }

export const Router = <T>(): GenericClassDecorator<T> =>
	Injector.generateNewConstructor;
