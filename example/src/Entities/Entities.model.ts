import { Model, ModelRef, Schema } from "../../..";

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

const entitySchema = new Schema(entityDefinition);

@Model<IEntity>({
	name: "Entity",
	schema: entityDefinition,
})
export class EntitiesModel {
	constructor(public modelRef: ModelRef<IEntity>) {}
}
