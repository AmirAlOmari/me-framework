import { GenericClassDecorator, Injector } from "./injector";

export const Injectable = <T>(): GenericClassDecorator<T> => target => {};
