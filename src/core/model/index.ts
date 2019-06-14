import { Schema, Document, Model as MModel, model as mmodel } from "mongoose";

import {
	GenericClassDecorator,
	InjectionRule,
	Injector,
} from "./../../utils/injector";

// export abstract class Model<T extends object> {
// 	public get _definition() {
// 		return this.schemaDefinition;
// 	}
// 	public get _schema() {
// 		return new Schema(this._definition);
// 	}

// 	public get create() {
// 		return this.__model.create.bind(this.__model);
// 	}
// 	public get find() {
// 		return this.__model.find.bind(this.__model);
// 	}
// 	public get findOne() {
// 		return this.__model.findOne.bind(this.__model);
// 	}
// 	public get findById() {
// 		return this.__model.findById.bind(this.__model);
// 	}
// 	public get findbyIdAndUpdate() {
// 		return this.__model.findByIdAndUpdate.bind(this.__model);
// 	}
// 	public get findByIdAndRemove() {
// 		return this.__model.findByIdAndRemove.bind(this.__model);
// 	}
// 	public get findByIdAndDelete() {
// 		return this.__model.findByIdAndDelete.bind(this.__model);
// 	}
// 	public get countDocuments() {
// 		return this.__model.countDocuments.bind(this.__model);
// 	}
// 	public get populate() {
// 		return this.__model.populate.bind(this.__model);
// 	}

// 	public get aggregate() {
// 		return this.__model.aggregate.bind(this.__model);
// 	}
// 	public __model: MModel<Document & T>;
// 	constructor(public name: string, public schemaDefinition: any) {
// 		try {
// 			this.__model = model<Document & T>(this.name);
// 		} catch (error) {
// 			this.__model = model<Document & T>(this.name, this._schema);
// 		}

// 		this.__model;
// 	}
// }

export interface IModelOpts {
	name: string;
	schema: any;
}

export const Model = <T = any>({
	name,
	schema,
}: IModelOpts): GenericClassDecorator<T> => constructor => {
	const injectionRule = (
		modelRef: ModelRef<IEntity>
	): InjectionRule => token => {
		switch (token) {
			case <any>ModelRef:
				return modelRef as any;
				break;

			default:
				break;
		}
	};

	const newConstructor = function(...args: Array<any>): T {
		if (!new.target) {
			throw new Error("Instance have to be created with 'new' keyword");
		}

		let model: MModel<any & Document>;

		try {
			model = mmodel(name);
		} catch (error) {
			model = mmodel(name, schema);
		}

		const modelRef = new ModelRef(name, schema, model);

		const instance = Injector.resolve<T>(
			constructor,
			injectionRule(modelRef)
		);

		return instance;
	};

	newConstructor._isRoutable = true;

	return newConstructor;
};

export class ModelRef<T> {
	constructor(
		protected name: string,
		protected schema: Schema<T>,
		protected model: MModel<T & Document>
	) {}

	public get create() {
		return this.model.create.bind(this.model);
	}
	public get find() {
		return this.model.find.bind(this.model);
	}
	public get findOne() {
		return this.model.findOne.bind(this.model);
	}
	public get findById() {
		return this.model.findById.bind(this.model);
	}
	public get findbyIdAndUpdate() {
		return this.model.findByIdAndUpdate.bind(this.model);
	}
	public get findByIdAndRemove() {
		return this.model.findByIdAndRemove.bind(this.model);
	}
	public get findByIdAndDelete() {
		return this.model.findByIdAndDelete.bind(this.model);
	}
	public get countDocuments() {
		return this.model.countDocuments.bind(this.model);
	}
	public get populate() {
		return this.model.populate.bind(this.model);
	}
}

export { Schema };
