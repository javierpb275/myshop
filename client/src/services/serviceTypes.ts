import { IUser } from "../interfaces/auth.interfaces";

export type BodyType = string | Object;

export type HeadersType = HeadersInit | undefined;

//TOKEN RELATED TYPES:
export enum Tokens {
  ACCESS_TOKEN = "access_token_myshop",
  REFRESH_TOKEN = "refresh_token_myshop",
}

export interface ITokenData {
  access_token: string;
  refresh_token: string;
}

export interface IPayload {
  sub: number; //user_id
  iat: number; //Creation Date
  nbf: number; //Creation Date
  exp: number; //Expiration Date
  fresh: boolean; //If the token is fresh or not
  type: string; //access | refresh
  jti: string; //Unique Identifier
}

//BODY TYPES:
export type Role = "USER" | "ADMIN";

export interface IBodySignIn {
  email: string;
  password: string;
}

export interface IBodySignUp {
  role: Role;
  username: string;
  email: string;
  password: string;
  accept_terms_conditions: boolean;
  avatar?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
}

export interface IBodySignOut {
  refresh_token: string;
}

export interface IBodyDeleteProfile {
  refresh_token: string;
}
//RETURN DATA TYPES:
export interface IReturnDataError {
  message: string;
  error?: string;
}

export interface IReturnDataTokenRefresh {
  message: string;
  access_token: string;
  refresh_token: string;
}

export interface IReturnDataSignIn {
  user: IUser;
  access_token: string;
  refresh_token: string;
  message: string;
}

export interface IReturnDataSignUp {
  user: IUser;
  access_token: string;
  refresh_token: string;
  message: string;
}

export interface IReturnDataSignOut {
  message: string;
}

export interface IReturnDataDeleteProfile {
  message: string;
}

export interface IReturnDataGetProfile {
  user: IUser;
  access_token: string;
  refresh_token: string;
  message: string;
}
export interface IResponse {
  error: boolean;
  data:
    | IReturnDataError
    | IReturnDataSignIn
    | IReturnDataSignUp
    | IReturnDataTokenRefresh
    | IReturnDataSignOut
    | IReturnDataDeleteProfile
    | IReturnDataGetProfile;
}
