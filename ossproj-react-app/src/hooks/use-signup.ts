import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ISignUpProps } from "../interface/user";
import { signUp } from "../services/sign";

export const useSignup = (props: ISignUpProps) => {
  const navigate = useNavigate();

  const {
    mutate: signup,
    data,
    isLoading,
    isSuccess,
  } = useMutation("signup", signUp, {
    onSuccess: () => {
      console.log(data);
      // navigate({
      //   pathname: '/signin',
      // });
    },
    onError: () => {
      console.log("error");
    },
  });
  const signupHandler = () => {
    signup(props);
  };
  return { signupHandler, data, isLoading, isSuccess };
};
