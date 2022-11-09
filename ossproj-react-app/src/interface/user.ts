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
  // rooms: [];
  // urls: [];
}

export interface ISignInResponse {
  name: string;
  accessToken: string;
  // rooms: [];
  // urls: [];
}
