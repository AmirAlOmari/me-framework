import { IRequest } from "./request.interface";
import { IResponse } from "./response.interface";
import { INextFunction } from "./next-function.interface";

export interface IErrorRequestHandler {
	(error: any, req: IRequest, res: IResponse, next: INextFunction): any;
}
