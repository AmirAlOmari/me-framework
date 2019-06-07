import { IRequest } from "./request.interface";
import { IResponse } from "./response.interface";
import { INextFunction } from "./next-function.interface";

/**
 * Appends `req.locals` to request context
 */
export const LocalAppender = <LocalType extends object>() => (
	req: IRequest<LocalType>,
	res: IResponse,
	next: INextFunction
) => {
	req.locals = <LocalType>{};

	next();
};
