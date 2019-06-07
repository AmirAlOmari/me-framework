import { App } from "../../src";

import { EntitiesRouter } from "./Entities/Entities.router";

export class ProjectApp extends App {
	constructor() {
		super();

		this.use("/api/entities", EntitiesRouter);
	}
}
