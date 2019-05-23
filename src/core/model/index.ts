import { Schema, Document, Model as MModel, model } from "mongoose";

export abstract class Model<T> {
	public _definition = this.schemaDefinition;
	public _schema = new Schema(this._definition);
	public __model = model<Document & T>(name, this._schema);

	public create = this.__model.create;
	public find = this.__model.find;
	public findOne = this.__model.findOne;
	public findById = this.__model.findById;
	public findbyIdAndUpdate = this.__model.findByIdAndUpdate;
	public findByIdAndRemove = this.__model.findByIdAndRemove;
	public findByIdAndDelete = this.__model.findByIdAndDelete;
	public countDocuments = this.__model.countDocuments;
	public populate = this.__model.populate;

	public aggregate = this.__model.aggregate;

	constructor(public schemaDefinition: any) {}
}
