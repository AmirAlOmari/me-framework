import { Router } from "../../../src";

import { EntitiesController } from "./Entities.controller";

export class EntitiesRouter extends Router {
	constructor(public entitiesController = new EntitiesController()) {
		super();

		this.use("/hi", this.entitiesController.hi());
		this.use("/create", this.entitiesController.create());
	}
}
