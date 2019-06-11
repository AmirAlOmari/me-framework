import { GenericClassDecorator, Injector } from "./../../utils/injector";

// export abstract class Service {}

export const Service = <T>(): GenericClassDecorator<T> =>
	Injector.generateNewConstructor;
