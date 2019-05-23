import { Model } from "../../../src";

export interface IEntity {
	key: "value";
	is: true;
	i: 0;
}

export class EntitiesModel extends Model<IEntity> {}
