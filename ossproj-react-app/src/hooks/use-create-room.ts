import { useMutation } from "react-query";
import { ICreateRoomProps } from "../interface/chat";
import { createRoom } from "../services/chat";

export const useCreateRoom = (props: ICreateRoomProps) => {
  const {
    mutate: createroom,
    data,
    isLoading,
    isSuccess,
  } = useMutation("createRoom", createRoom, {
    onSuccess: () => {
      console.log(data);
    },
    onError: (e) => {
      console.log(props);
      console.log(e);
    },
  });
  const createRoomHandler = () => {
    console.log(props);
    createroom(props);
  };
  return { createRoomHandler, data, isLoading, isSuccess };
};
