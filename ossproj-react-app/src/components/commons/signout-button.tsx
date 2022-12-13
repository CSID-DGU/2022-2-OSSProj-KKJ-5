import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { MenuButton } from "./menu-button";

interface ISignoutButtonProps {
  handler: () => void;
}

export const SignoutButton = ({ handler }: ISignoutButtonProps) => {
  const navigate = useNavigate();
  return (
    <MenuButton onClick={handler}>
      <LogoutIcon fontSize={"inherit"} />
    </MenuButton>
  );
};
