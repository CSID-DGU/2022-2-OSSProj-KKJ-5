import axios from "axios";
import { IResponseAuth, ISignInProps, ISignUpProps } from "../interface/user";

export const signUp = ({ email, password, name }: ISignUpProps) => {
  const url = `/member`;
  return axios
    .post<IResponseAuth>(url, { email, password, name })
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
};

export const signIn = ({ email, password }: ISignInProps) => {
  const url = `/member`;
  return axios.post<IResponseAuth>(url, { email, password }).then((res) => {
    console.log(res.data);
    return res.data;
  });
};
