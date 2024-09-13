import { Request } from "express";

export interface JwtPayload {
  id: string;
  roles: string[];
}

export interface userRequest extends Request {
  user?: {
    id: string;
    roles: string[];
  };
}
