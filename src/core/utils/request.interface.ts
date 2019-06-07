import { Request } from "express";

export interface IRequest<LocalType extends object = {}> extends Request {
	locals?: LocalType | {};
}
