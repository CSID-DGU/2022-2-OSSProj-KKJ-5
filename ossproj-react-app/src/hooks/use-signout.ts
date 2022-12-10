import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ISignUpProps } from "../interface/user";
import { signOut, signUp } from "../services/sign";

export const useSignOut = () => {
  const {
    mutate: signout,
    data,
    isLoading,
    isSuccess,
  } = useMutation("signup", signOut, {
    onSuccess: () => {
      console.log(data);
      // navigate({
      //   pathname: '/signin',
      // });
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
