import { GenericClassDecorator, Injector } from "./../../utils/injector";

// export abstract class Resource {}

export const Resource = <T>(): GenericClassDecorator<T> =>
	Injector.generateNewConstructor;
