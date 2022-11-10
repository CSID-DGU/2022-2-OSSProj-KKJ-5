import axios from "axios";
import { ICreateRoomProps } from "../interface/chat";

export const createRoom = ({ roomName }: ICreateRoomProps) => {
  const url = `/chat/room`;
  return axios.post(url, { roomName }).then((res) => {
    return res.data;
  });
};
