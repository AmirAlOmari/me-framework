import { App, MetaClassDecorator } from "../..";

import { EntitiesRouter } from "./Entities/Entities.router";

@App()
export class ProjectApp {
	constructor(public entitiesRouter: EntitiesRouter) {
		// super();
		// this.use("/api/entities", EntitiesRouter);
	}
}
