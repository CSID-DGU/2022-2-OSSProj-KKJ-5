import HomeIcon from "@mui/icons-material/Home";
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
      <HomeIcon fontSize={"inherit"} />
    </MenuButton>
  );
};
