import axios from "axios";
import { ICreateRoomProps, IRoomProps } from "../interface/chat";

export const createRoom = (formData: FormData) => {
  const url = `/chat/room`;
  return axios.post<IRoomProps>(url, { formData }).then((res) => {
    return res.data;
  });
};

export const getRoomList = () => {
  const url = `chat/rooms`;
  return axios.get<IRoomProps[]>(url).then((res) => {
    return res.data;
  });
};
