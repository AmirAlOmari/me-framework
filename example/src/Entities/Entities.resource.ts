import { Resource } from "../../../src";

import { EntitiesModel } from "./Entities.model";

export class EntitiesResource extends Resource {
	constructor(public entitiesModel = new EntitiesModel()) {
		super();
	}

	public async getHiString() {
		return "hi!";
	}
}
