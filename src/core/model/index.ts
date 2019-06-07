import { Schema, Document, Model as MModel, model } from "mongoose";

export abstract class Model<T extends object> {
	public get _definition() {
		return this.schemaDefinition;
	}
	public get _schema() {
		return new Schema(this._definition);
	}

	public get create() {
		return this.__model.create.bind(this.__model);
	}
	public get find() {
		return this.__model.find.bind(this.__model);
	}
	public get findOne() {
		return this.__model.findOne.bind(this.__model);
	}
	public get findById() {
		return this.__model.findById.bind(this.__model);
	}
	public get findbyIdAndUpdate() {
		return this.__model.findByIdAndUpdate.bind(this.__model);
	}
	public get findByIdAndRemove() {
		return this.__model.findByIdAndRemove.bind(this.__model);
	}
	public get findByIdAndDelete() {
		return this.__model.findByIdAndDelete.bind(this.__model);
	}
	public get countDocuments() {
		return this.__model.countDocuments.bind(this.__model);
	}
	public get populate() {
		return this.__model.populate.bind(this.__model);
	}

	public get aggregate() {
		return this.__model.aggregate.bind(this.__model);
	}
	public __model: MModel<Document & T>;
	constructor(public name: string, public schemaDefinition: any) {
		try {
			this.__model = model<Document & T>(this.name);
		} catch (error) {
			this.__model = model<Document & T>(this.name, this._schema);
		}

		this.__model;
	}
}
