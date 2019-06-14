import { GenericClassDecorator, Injector } from "./../../utils/injector";

// export abstract class Resource {}

export const Resource = <T = any>(): GenericClassDecorator<T> =>
	Injector.generateNewConstructor;
