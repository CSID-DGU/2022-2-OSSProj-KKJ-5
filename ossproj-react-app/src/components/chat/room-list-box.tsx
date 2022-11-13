import { Card, CardContent, CardMedia, Typography } from "@mui/material";

interface IRoomListBoxProps {
  roomName: string;
  roomId: number;
  img: string;
  user: string;
  handleIsChat: (id: string) => void;
}
export const RoomListBox = ({
  roomName,
  roomId,
  img,
  user,
  handleIsChat,
}: IRoomListBoxProps) => {
  return (
    <Card sx={{ display: "flex" }} onClick={() => handleIsChat(roomName)}>
      <CardMedia
        component={"img"}
        image={img}
        sx={{ width: 80, borderRadius: `50%` }}
      />
      <CardContent>
        <Typography variant={"h5"}>{roomName}</Typography>
        <Typography variant={"body1"}>{user}</Typography>
      </CardContent>
    </Card>
  );
};
