import { Grid } from "@mui/material";
import { IChatDetail } from "../../interface/chat";
import { MessageBox } from "./message-box";

interface IChatMessageListProps {
  chatMessages: IChatDetail[];
}
export const ChatMessageList = ({ chatMessages }: IChatMessageListProps) => {
  return (
    <>
      {chatMessages.map((props) => {
        return props.type === "ENTER" ? (
          <Grid
            key={props.sender}
            item
            display={"flex"}
            justifyContent={"center"}
            margin={"20px"}
          >
            {props.message}
          </Grid>
        ) : (
          <Grid
            key={props.sender}
            item
            display={"flex"}
            justifyContent={"flex-start"}
          >
            <MessageBox
              message={props.message}
              user={"김재한"}
              isUser={false}
            />
          </Grid>
        );
      })}
    </>
  );
};
