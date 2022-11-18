import axios from "axios";
import { ICreateRoomProps, IRoomProps } from "../interface/chat";

export const createRoom = ({ name, imgForm }: ICreateRoomProps) => {
  const url = `/chat/room`;
  let formData = new FormData();

  formData.append("data", new Blob(["image"], { type: "application/json" }));
  return axios.post<IRoomProps>(url, { name, imgForm }).then((res) => {
    return res.data;
  });
};

export const getRoomList = () => {
  const url = `chat/rooms`;
  return axios.get<IRoomProps[]>(url).then((res) => {
    return res.data;
  });
};
