import { useMutation } from "react-query";
import { useUserState } from "../context/user-context";
import { ICreateRoomProps } from "../interface/chat";
import { createRoom } from "../services/chat";

export const useCreateRoom = (props: ICreateRoomProps) => {
  const user = useUserState();
  // const formData = new FormData();
  // formData.append("pictureFile", props.pictureFile);
  // formData.append("name", props.name);
  const {
    mutate: createroom,
    data,
    isLoading,
    isSuccess,
  } = useMutation("createRoom", createRoom, {
    onSuccess: (data) => {
      console.log(data)
      if (data) {
        console.log(data);
        user.rooms = user.rooms.concat(data);
      }
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const createRoomHandler = () => {
    createroom(props);
  };
  return { createRoomHandler, data, isLoading, isSuccess };
};
