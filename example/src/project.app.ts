import { App, AppRef } from "../..";

import { EntitiesRouter } from "./Entities/Entities.router";

@App()
export class ProjectApp {
	constructor(public appRef: AppRef, public entitiesRouter: EntitiesRouter) {
		// super();
		// this.use("/api/entities", EntitiesRouter);
		appRef.use("/entities", <any>entitiesRouter);
	}
}
