import { Model } from "../../..";

export interface IEntity {
	key: "value";
	is: true;
	i: 0;
}

const entityDefinition = {
	key: { type: String },
	is: { type: Boolean },
	i: { type: Number },
};

@Model()
export class EntitiesModel {
	constructor() {
		// super("Entitiy", entityDefinition);
	}
}
