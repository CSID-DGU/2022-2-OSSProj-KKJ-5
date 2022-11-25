import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { MenuButton } from "./menu-button";
export const HomeButton = () => {
  const navigate = useNavigate();
  return (
    <MenuButton
      onClick={() => {
        navigate("/");
      }}
    >
      <LogoutIcon fontSize={"inherit"} />
    </MenuButton>
  );
};
