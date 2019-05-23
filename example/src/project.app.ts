import { App, Appends, USE } from "../../src";

import { EntityRouter } from "./Entities/Entities.router";

export class ProjectApp extends App {
	public static appends: Appends = [USE("*", (req, res, next) => next()), USE("/test", EntityRouter)];

	constructor() {
		super(ProjectApp.appends);
	}
}
