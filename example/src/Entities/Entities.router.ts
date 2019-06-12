import { Router, RouterRef } from "../../..";

import { EntitiesController } from "./Entities.controller";

@Router()
export class EntitiesRouter {
	constructor(
		public routerRef: RouterRef,
		public entitiesController: EntitiesController
	) {
		// super();
		// this.use("/hi", this.entitiesController.hi());
		// this.use("/create", this.entitiesController.create());
		routerRef.get("/hi", entitiesController.hi());
	}
}
