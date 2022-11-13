import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface IMessageSendButtonProps {
  handleSend: () => void;
}
export const MessageSendButton = ({ handleSend }: IMessageSendButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={handleSend}
      size={"large"}
      endIcon={<SendIcon />}
      sx={{
        height: `50px`,
      }}
    >
      Send
    </Button>
  );
};
