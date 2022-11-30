import { Box, Grid } from "@mui/material";
import { forwardRef, useRef } from "react";
import { Fade } from "react-awesome-reveal";
import { IUser } from "../../interface/user";
import { RoomBox } from "./room-box";

interface IRoomBoxListProps {
  user: IUser | undefined;
  roomId: string;
  connectHandler: (mockName: string, mockRoomId: string) => void;
  ref: React.RefObject<HTMLDivElement>;
}
export const RoomBoxList = forwardRef<HTMLDivElement, IRoomBoxListProps>(
  ({ user, roomId, connectHandler }: IRoomBoxListProps, ref) => {
    return (
      <Box
        height={{ lg: "80vh", md: "80vh", sm: "10vh", xs: "10vh" }}
        sx={{ overflowY: "scroll" }}
      >
        {user &&
          user.rooms.map((room) => {
            return (
              <Fade direction={"up"}>
                <RoomBox
                  roomName={room.name}
                  roomId={room.roomId}
                  selected={roomId}
                  img={room.imageUrl}
                  user={""}
                  connectHandler={connectHandler}
                />
              </Fade>
            );
          })}
        <div ref={ref}></div>
      </Box>
    );
  }
);
