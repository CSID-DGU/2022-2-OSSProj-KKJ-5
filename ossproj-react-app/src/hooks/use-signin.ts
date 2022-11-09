import axios from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useUserDispatch, useUserState } from "../context/user-context";
import { ResponseEntity } from "../interface/api";
import { ISignInProps, ISignInResponse } from "../interface/user";
import { signIn } from "../services/sign";

export const useSignIn = (props: ISignInProps) => {
  const navigate = useNavigate();
  const dispatch = useUserDispatch();
  const {
    mutate: signin,
    data,
    isLoading,
    isSuccess,
    isError,
  } = useMutation("signin", signIn, {
    onSuccess: (res) => {
      console.log(`Response: `, res);
      // const { data }: ResponseEntity<ISignInResponse> = res;
      if (res) {
        if (res.accessToken) {
          console.log(res)
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.accessToken}`;
        }

        dispatch({ type: "SET_NAME", name: res.name });
        // dispatch({ type: "SET_ROOMS", rooms: data.rooms });
        // dispatch({ type: "SET_URLS", urls: data.urls });
      }
    },
    onError: (error) => {
      console.log(`Use Signin Error: `, error);
    },
  });

  const signinHandler = () => {
    signin(props);
  };
  return { signinHandler, data, isLoading, isSuccess, isError };
};
