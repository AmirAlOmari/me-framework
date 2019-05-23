import { Response } from "express";

export interface IResponse extends Response {
	[key: string]: any;
}
