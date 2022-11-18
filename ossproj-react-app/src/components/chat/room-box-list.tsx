import { Grid } from "@mui/material";
import { Fade } from "react-awesome-reveal";
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
  return (
    <div>
      {user &&
        user.rooms.map((room) => {
          return (
            <Grid item key={room.roomId}>
              <Fade direction={"up"}>
                <RoomBox
                  roomName={room.name}
                  roomId={room.roomId}
                  selected={roomId}
                  img={room.picturePath}
                  user={""}
                  connectHandler={connectHandler}
                />
              </Fade>
            </Grid>
          );
        })}
    </div>
  );
};
