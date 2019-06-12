import { Router as NativeRouter } from "express";

import { Routable } from "../utils/routable.cclass";
import {
	GenericClassDecorator,
	InjectionRule,
	Injector,
} from "../../utils/injector";

// export abstract class Router extends Routable {
// 	constructor(public _exRouter = NativeRouter()) {
// 		super(_exRouter);
// 	}
// }

export const Router = <T = any>(): GenericClassDecorator<T> => constructor => {
	const injectionRule = (routerRef: RouterRef): InjectionRule => token => {
		switch (token) {
			case <any>RouterRef:
				return routerRef as any;
				break;

			default:
				break;
		}
	};

	const newConstructor = function(...args: Array<any>): T {
		if (!new.target) {
			throw new Error("Instance have to be created with 'new' keyword");
		}

		const _exRouter = NativeRouter();
		const routerRef = new RouterRef(_exRouter);

		_exRouter.use((req: any, res: any, next: any) => {
			req.state = req.state ? req.state : {};
			next();
		});

		const instance = Injector.resolve<T>(
			constructor,
			injectionRule(routerRef)
		);

		(<any>instance)._router = _exRouter;

		return instance;
	};

	newConstructor._isRoutable = true;

	return newConstructor;
};

export class RouterRef extends Routable {
	constructor(protected _router: NativeRouter) {
		super(_router);
	}
}
