import axios from "axios";
import { IResponseAuth, ISignUpProps } from "../interface/user";

export const signUp = ({ email, password, name }: ISignUpProps) => {
  const url = `/member`;
  return axios
    .post<IResponseAuth>(url, { email, password, name })
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
};
