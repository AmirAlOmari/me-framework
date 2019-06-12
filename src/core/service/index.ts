import { GenericClassDecorator, Injector } from "./../../utils/injector";

// export abstract class Service {}

export const Service = <T = any>(): GenericClassDecorator<T> =>
	Injector.generateNewConstructor;
