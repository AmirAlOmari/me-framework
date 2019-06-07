import { Router, IRouterHandler, IRouterMatcher } from "express";

import { IRequestHandler } from "./request-handler.interface";
import { IErrorRequestHandler } from "./error-request-handler.interface";
import { TPathParams } from "./path-params.type";

export interface RoutableLike {
	prototype: {
		use(path: TPathParams, ...handlers: Array<TAnyHandler>): any;
		get(path: TPathParams, ...handlers: Array<TAnyHandler>): any;
		put(path: TPathParams, ...handlers: Array<TAnyHandler>): any;
		post(path: TPathParams, ...handlers: Array<TAnyHandler>): any;
		delete(path: TPathParams, ...handlers: Array<TAnyHandler>): any;
	};
}

export type TAnyHandler = IRequestHandler | IErrorRequestHandler | RoutableLike;

export type TMiddlewareFunction =
	| ((...handlers: Array<TAnyHandler>) => any)
	| ((path: TPathParams, ...handlers: Array<TAnyHandler>) => any);

export abstract class Routable {
	public static isRoutable(object: any): boolean {
		return (
			object &&
			object.__proto__ &&
			object.__proto__.__proto__.prototype &&
			object.__proto__.__proto__.prototype.__isRoutable &&
			object.__proto__.__proto__.prototype.__isRoutable()
		);
	}

	public static isLooksLikeRoutable(object: any): boolean {
		return (
			object &&
			object.__proto__ &&
			object.__proto__.__proto__.prototype &&
			object.__proto__.__proto__.prototype.use &&
			object.__proto__.__proto__.prototype.get &&
			object.__proto__.__proto__.prototype.post
		);
	}

	public static isMiddleware(object: any): boolean {
		return object && typeof object.main === "function";
	}

	public static isFunciton(object: any): boolean {
		return typeof object === "function";
	}

	constructor(private __nativeRoutable: Router) {}

	public __isRoutable() {
		return true;
	}

	public use(path: TPathParams, ...handlers: Array<TAnyHandler>) {
		this._use(this.__nativeRoutable.use, path, ...handlers);
	}

	public get(path: TPathParams, ...handlers: Array<TAnyHandler>) {
		this._use(this.__nativeRoutable.get, path, ...handlers);
	}

	public put(path: TPathParams, ...handlers: Array<TAnyHandler>) {
		this._use(this.__nativeRoutable.put, path, ...handlers);
	}

	public post(path: TPathParams, ...handlers: Array<TAnyHandler>) {
		this._use(this.__nativeRoutable.post, path, ...handlers);
	}

	public delete(path: TPathParams, ...handlers: Array<TAnyHandler>) {
		this._use(this.__nativeRoutable.delete, path, ...handlers);
	}

	private _use(
		func: any,
		path: TPathParams,
		...handlers: Array<TAnyHandler>
	) {
		const toUseArray: Array<any> = [];

		handlers.forEach((handler: any) => {
			let toUse: any;

			if (Routable.isRoutable(handler)) {
				const ins = new handler();
				toUse = ins.__nativeRoutable;
			} else if (Routable.isMiddleware(handler)) {
				const ins = new handler();
				toUse = ins.main;
			} else if (Routable.isLooksLikeRoutable(handler)) {
				toUse = handler;
			} else if (Routable.isFunciton(handler)) {
				toUse = handler;
			}

			if (!toUse) {
				throw new Error("Can not use this shit");
			}

			toUseArray.push(toUse);
		});

		func.apply(this.__nativeRoutable, [path, toUseArray]);
	}
}
