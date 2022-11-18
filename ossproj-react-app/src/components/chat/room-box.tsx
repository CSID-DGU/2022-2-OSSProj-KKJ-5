import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { sleep } from "react-query/types/core/utils";

interface IRoomBoxProps {
  roomName: string;
  roomId: string;
  img: string;
  user: string;
  selected: string;
  connectHandler: (mockName: string, mockRoomId: string) => void;
}
export const RoomBox = ({
  roomName,
  selected,
  roomId,
  img,
  user,
  connectHandler,
}: IRoomBoxProps) => {
  const background = roomId === selected ? "grey" : "";
  return (
    <Card
      sx={{
        display: "flex",
        padding: "10px",
        margin: "10px",
        backgroundColor: background,
      }}
      onClick={() => connectHandler(roomId, roomName)}
    >
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
