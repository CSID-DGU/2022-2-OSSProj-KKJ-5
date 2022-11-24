export interface ICreateRoomProps {
  name: string;
  image: File;
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
