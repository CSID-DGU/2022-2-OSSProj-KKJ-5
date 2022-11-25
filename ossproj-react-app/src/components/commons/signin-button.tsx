import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { MenuButton } from "./menu-button";
export const SigninButton = () => {
  const navigate = useNavigate();
  return (
    <MenuButton
      onClick={() => {
        navigate("/signin");
      }}
    >
      <LoginIcon fontSize={"inherit"} />
    </MenuButton>
  );
};
