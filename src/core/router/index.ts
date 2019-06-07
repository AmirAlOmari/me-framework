import { Router as NativeRouter } from "express";

import { Routable } from "./../utils/routable.class";

export abstract class Router extends Routable {
	constructor(public _exRouter = NativeRouter()) {
		super(_exRouter);
	}
}
