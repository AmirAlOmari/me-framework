import { Schema, Document, Model as MModel, model } from "mongoose";

export const Model = (name: string, schemaDefinition: any) => (constructor: new () => any) => constructor;
export class BaseModel<T extends Document> {
	public definition = this.schemaDefinition;
	public schema = new Schema(this.definition);
	public model = model<T>(name, this.schema);

	public create = this.model.create;
	public find = this.model.find;
	public findOne = this.model.findOne;
	public findById = this.model.findById;
	public findbyIdAndUpdate = this.model.findByIdAndUpdate;
	public findByIdAndRemove = this.model.findByIdAndRemove;
	public findByIdAndDelete = this.model.findByIdAndDelete;
	public countDocuments = this.model.countDocuments;
	public populate = this.model.populate;

	public aggregate = this.model.aggregate;

	constructor(public schemaDefinition: any) {}
}
