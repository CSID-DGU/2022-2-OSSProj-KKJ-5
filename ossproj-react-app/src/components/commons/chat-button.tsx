import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from "react-router-dom";
import { MenuButton } from "./menu-button";
export const ChatButton = () => {
  const navigate = useNavigate();
  return (
    <MenuButton
      onClick={() => {
        navigate("/chat");
      }}
    >
      <ChatIcon fontSize={"inherit"} />
    </MenuButton>
  );
};
