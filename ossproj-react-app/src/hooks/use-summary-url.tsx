import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { IUrlProps } from "../interface/url";
import { ISignUpProps } from "../interface/user";
import { signUp } from "../services/sign";
import { summaryContent } from "../services/url";

export const useSummaryContent = (props: IUrlProps) => {
  const {
    mutate: summarycontent,
    data,
    isLoading,
    isSuccess,
  } = useMutation("summary", summaryContent, {
    onSuccess: () => {
      console.log(data);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const summaryHandler = () => {
    summarycontent(props);
  };
  return { summaryHandler, data, isLoading, isSuccess };
};
