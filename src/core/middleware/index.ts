import { IRequest } from "./../utils/request.interface";
import { IResponse } from "./../utils/response.interface";
import { INextFunction } from "./../utils/next-function.interface";

export interface Middleware {
	main(req: IRequest, res: IResponse, next: INextFunction): Promise<any>;
}
