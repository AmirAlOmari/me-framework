import { Model } from "../../../src";

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

export class EntitiesModel extends Model<IEntity> {
	constructor() {
		super("Entitiy", entityDefinition);
	}
}
