import { Resource } from "../../..";

import { EntitiesModel } from "./Entities.model";

@Resource()
export class EntitiesResource {
	constructor(public entitiesModel: EntitiesModel) {
		// super();
	}

	public async getHiString() {
		return "hi!";
	}
}
