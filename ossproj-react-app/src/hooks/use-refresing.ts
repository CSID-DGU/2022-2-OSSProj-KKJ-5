import axios from "axios";
import { useMutation } from "react-query";
import { useUserDispatch } from "../context/user-context";
import { ISignInProps } from "../interface/user";
import { refresh } from "../services/sign";

export const useRefresh = () => {
  const dispatch = useUserDispatch();
  const { mutate: refreshToken, data } = useMutation("refresh", refresh, {
    onSuccess: (res) => {
      //   if (res) {
      //     if (res.accessToken) {
      //       console.log(res);
      //       axios.defaults.headers.common[
      //         "Authorization"
      //       ] = `Bearer ${res.accessToken}`;
      //     }
      //     dispatch({ type: "SET_NAME", name: res.name });
      //   }
    },
    onError: (error) => {
      console.log(`Use Signin Error: `, error);
    },
  });

  const refreshHandler = () => {
    refreshToken();
  };
  return { refreshHandler, data };
};
