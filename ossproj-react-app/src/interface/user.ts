import { IRoomProps } from "./chat";

export interface IResponseAuth {
  statusCode: number;
  message: string;
  data: any;
}

export interface ISignUpProps {
  email: string;
  password: string;
  name: string;
}

export interface ISignInProps {
  email: string;
  password: string;
}

export interface IUser {
  name: string;
  rooms: IRoomProps[];
  urls: string[];
}

export interface ISignInResponse {
  name: string;
  accessToken: string;
  rooms: [];
  urls: [];
}

export interface IRefreshResponse {
  name: string;
  accessToken: string;
}
