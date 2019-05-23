import { Router, Appends } from "../../../src";

export class EntityRouter extends Router {
	private static appends: Appends = [];

	constructor() {
		super(EntityRouter.appends);
	}
}
