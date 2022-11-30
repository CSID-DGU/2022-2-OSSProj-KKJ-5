export interface ICreateRoomProps {
  name: string;
  imageUrl: string;
  // pictureFile: File;
}
export interface IFormProps {
  name: string;
  img: string;
}
export interface IRoomProps {
  name: string;
  roomId: string;
  image: string;
}

export interface IChatDetail {
  type: string;
  roomId: string;
  sender: string;
  message: string;
}
