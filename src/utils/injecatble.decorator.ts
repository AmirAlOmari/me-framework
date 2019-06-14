import { GenericClassDecorator, Injector } from "./injector";

export const Injectable = <T>(): GenericClassDecorator<T> =>
	Injector.generateNewConstructor;
