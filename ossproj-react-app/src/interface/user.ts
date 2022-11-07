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
