export interface Type<T> {
	new (...args: Array<any>): T;
}

export type GenericClassDecorator<T> = (target: Type<T>) => any;

export type InjectionRule = <T>(token: Type<T>) => T | void;

export type Injection = any;

export const Injector = new (class {
	public resolve<T>(
		target: Type<T>,
		injectionRule?: InjectionRule /** @todo */
	): T {
		const tokens: Array<any> =
			Reflect.getMetadata("design:paramtypes", target) || [];
		const injections: Array<Injection> = tokens.map(token => {
			const injectionRuleResult = injectionRule
				? injectionRule(token)
				: void null;

			return injectionRuleResult
				? injectionRuleResult
				: Injector.resolve<any>(token);
		});

		return new target(...injections);
	}

	public generateNewConstructor<T>(constructor: Type<T>) {
		const originContructor = constructor;

		const newConstructor = function() {
			if (!new.target) {
				throw new Error(
					"Instance have to be created with 'new' keyword"
				);
			}

			return Injector.resolve<T>(constructor);
		};

		return newConstructor;
	}
})();
