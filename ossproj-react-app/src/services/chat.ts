import axios from "axios";
import { ICreateRoomProps, IRoomProps } from "../interface/chat";

export const createRoom = ({ name, imageUrl }: ICreateRoomProps) => {
  const url = `/chat/room`;
  return axios
    .post<IRoomProps>(
      url,
      { name, imageUrl },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
    .then((res) => {
      return res.data;
    });
};

export const getRoomList = () => {
  const url = `chat/rooms`;
  return axios.get<IRoomProps[]>(url).then((res) => {
    return res.data;
  });
};
