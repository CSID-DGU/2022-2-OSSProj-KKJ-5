import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useUserDispatch } from "../context/user-context";
import { ISignUpProps } from "../interface/user";
import { signOut, signUp } from "../services/sign";

export const useSignOut = () => {
  const navigate = useNavigate();
  const dispatch = useUserDispatch();
  const {
    mutate: signout,
    data,
    isLoading,
    isSuccess,
  } = useMutation("signup", signOut, {
    onSuccess: () => {
      axios.defaults.headers.common["Authorization"] = "";
      navigate({
        pathname: "/signin",
      });
      dispatch({ type: "SET_NAME", name: "" });
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const signoutHandler = () => {
    signout();
  };
  return { signoutHandler, data, isLoading, isSuccess };
};
