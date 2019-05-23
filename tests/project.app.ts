import { App, USE } from "./../src";

@App([
	USE("*", (req, res, next) => {
		console.log(req);
		next();
	}),
])
export class ProjectApp {}
