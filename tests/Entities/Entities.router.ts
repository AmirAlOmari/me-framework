import { Router, USE } from "./../../src";

@Router([
	USE("*", (req, res, next) => {
		console.log(req, res);
		next();
	}),
])
export class EntityRouter {}
