import axios from "axios";
import { GenericResponse, ResponseEntity } from "../interface/api";
import {
  IRefreshResponse,
  IResponseAuth,
  ISignInProps,
  ISignInResponse,
  ISignUpProps,
} from "../interface/user";

export const signUp = ({ email, password, name }: ISignUpProps) => {
  const url = `/member/signUp`;
  return axios.post(url, { email, password, name }).then((res) => {
    return res.data;
  });
};

export const signIn = ({ email, password }: ISignInProps) => {
  const url = `/member/signIn`;
  return axios.post<ISignInResponse>(url, { email, password }).then((res) => {
    return res.data;
  });
};

export const refresh = () => {
  const url = "/token/refresh";
  return axios.post<IRefreshResponse>(url).then((res) => {
    return res.data;
  });
};

export const signOut = () => {
  const url = `/member/signOut`;
  return axios.post(url).then((res) => {
    return res.data;
  });
};
