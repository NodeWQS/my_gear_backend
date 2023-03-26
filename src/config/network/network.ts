import { Request } from "express";

export type ReqBody<T> = Request<never, never, T>;
export type ReqParams<T> = Request<T>;
export type ReqQuery<T> = Request<never, never, never, T>;
export type ReqPBody<T, K> = Request<T, never, K>;