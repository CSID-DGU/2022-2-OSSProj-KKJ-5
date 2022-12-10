import { Box, Grid } from "@mui/material";
import { forwardRef, useRef } from "react";
import { Fade } from "react-awesome-reveal";
import { IUser } from "../../interface/user";
import { RoomBox } from "./room-box";

interface IRoomBoxListProps {
  user: IUser | undefined;
  roomId: string;
  connectHandler: (mockName: string, mockRoomId: string) => void;
}
export const RoomBoxList = forwardRef<HTMLDivElement, IRoomBoxListProps>(
  (props, ref) => {
    console.log(props.user?.rooms);
    return (
      <Box
        height={{ lg: "80vh", md: "80vh", sm: "10vh", xs: "10vh" }}
        sx={{
          overflowY: "scroll",
          display: { lg: "block", md: "block", sm: "flex", xs: "flex" },
        }}
        width={{ lg: "95%", md: "90%", sm: "600px", xs: "300px" }}
      >
        {props.user &&
          props.user.rooms.map((room) => {
            return (
              <Fade direction={"up"}>
                <RoomBox
                  roomName={room.name}
                  roomId={room.roomId}
                  selected={props.roomId}
                  img={room.imageUrl}
                  user={""}
                  connectHandler={props.connectHandler}
                />
              </Fade>
            );
          })}
        <div ref={ref}></div>
      </Box>
    );
  }
);
