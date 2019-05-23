export abstract class Controller {
	constructor(...methods: Array<(...args: Array<any>) => void>) {
		methods.forEach(method => (method = method.bind(this)));
	}
}
