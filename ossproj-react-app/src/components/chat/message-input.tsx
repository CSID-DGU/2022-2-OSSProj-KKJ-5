import { Box, IconButton, InputBase, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { ChangeEvent } from "react";

interface IMessageInputProps {
  message: string;
  handleMessage: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSend: () => void;
  handleDelete: () => void;
}
export const MessageInput = ({
  message,
  handleMessage,
  handleSend,
  handleDelete,
}: IMessageInputProps) => {
  return (
    <Box display={"flex"} height={`100%`}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: `95%`,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={"message"}
          inputProps={{ "aria-label": "search google maps" }}
          value={message}
          onChange={handleMessage}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <IconButton onClick={handleDelete}>
          <CloseIcon />
        </IconButton>
      </Paper>
      <IconButton onClick={handleSend}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};
