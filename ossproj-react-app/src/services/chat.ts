import axios from "axios";
import { ResponseEntity } from "../interface/api";
import { ICreateRoomProps, IRoomProps } from "../interface/chat";

export const createRoom = ({ imgForm }: ICreateRoomProps) => {
  const url = `/chat/room`;
  return axios.post<IRoomProps>(url, { imgForm }).then((res) => {
    return res.data;
  });
};

export const getRoomList = () => {
  const url = `chat/rooms`;
  return axios.get<IRoomProps[]>(url).then((res) => {
    return res.data;
  });
};
