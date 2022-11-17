export interface ICreateRoomProps {
  name: string;
  image: string;
  // imgForm: FormData;
}
export interface IFormProps {
  name: string;
  img: string;
}
export interface IRoomProps {
  name: string;
  roomId: string;
  picturePath: string;
}

export interface IChatDetail {
  type: string;
  roomId: string;
  sender: string;
  message: string;
}
