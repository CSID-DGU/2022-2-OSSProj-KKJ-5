import { Grid } from "@mui/material";
import { IUser } from "../../interface/user";
import { RoomBox } from "./room-box";

interface IRoomBoxListProps {
  user: IUser | undefined;
  roomId: string;
  connectHandler: (mockName: string, mockRoomId: string) => void;
}
export const RoomBoxList = ({
  user,
  roomId,
  connectHandler,
}: IRoomBoxListProps) => {
  console.log(user);
  return (
    <div>
      {user &&
        user.rooms.map((room) => {
          return (
            <Grid item key={room.roomId}>
              <RoomBox
                roomName={room.name}
                roomId={room.roomId}
                selected={roomId}
                img={room.picturePath}
                user={""}
                connectHandler={connectHandler}
              />
            </Grid>
          );
        })}
    </div>
  );
};
