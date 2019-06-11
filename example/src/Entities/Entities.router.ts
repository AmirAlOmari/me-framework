import { Router, MetaClassDecorator } from "../../..";

import { EntitiesController } from "./Entities.controller";

@Router()
export class EntitiesRouter {
	constructor(public entitiesController: EntitiesController) {
		// super();
		// this.use("/hi", this.entitiesController.hi());
		// this.use("/create", this.entitiesController.create());
	}
}
