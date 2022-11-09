import axios from "axios";
import { GenericResponse, ResponseEntity } from "../interface/api";
import {
  IResponseAuth,
  ISignInProps,
  ISignInResponse,
  ISignUpProps,
} from "../interface/user";

export const signUp = ({ email, password, name }: ISignUpProps) => {
  const url = `/member/signUp`;
  return axios
    .post<ResponseEntity<null>>(url, { email, password, name })
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
};

export const signIn = ({ email, password }: ISignInProps) => {
  const url = `/member/signIn`;
  return axios
    .post<ISignInResponse>(url, { email, password })
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
};
