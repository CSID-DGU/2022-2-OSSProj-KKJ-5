import axios from "axios";
import { ICreateRoomProps, IRoomProps } from "../interface/chat";

export const createRoom = (formData: FormData) => {
  const url = `/chat/room`;
  console.log(formData.get("name"));
  console.log(formData.get("pictureFile"));
  return axios
    .post<IRoomProps>(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
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
