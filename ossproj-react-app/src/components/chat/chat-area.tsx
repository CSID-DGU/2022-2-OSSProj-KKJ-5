import { Box, Grid } from "@mui/material";
import { forwardRef } from "react";
import { IChatDetail } from "../../interface/chat";
import { ChatMessageList } from "./chat-message-list";

interface IChatAreaProps {
  chatName: String;
  chatMessages: IChatDetail[];
  ref: React.RefObject<HTMLDivElement>;
}
export const ChatArea = forwardRef<HTMLDivElement, IChatAreaProps>(
  ({ chatName, chatMessages, ref }) => {
    return (
      <Grid item lg={11} md={11} sm={10} xs={10}>
        {chatName}
        <Box
          border={`1px solid black`}
          height={`75vh`}
          sx={{ overflowY: "scroll" }}
        >
          <ChatMessageList chatMessages={chatMessages} />
          <div ref={ref}></div>
        </Box>
      </Grid>
    );
  }
);
