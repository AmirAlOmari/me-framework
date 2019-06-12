import { Model, ModelRef } from "../../..";

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

@Model<IEntity>({
	name: "Entity",
	definition: entityDefinition,
})
export class EntitiesModel {
	constructor(public modelRef: ModelRef<IEntity>) {}
}
