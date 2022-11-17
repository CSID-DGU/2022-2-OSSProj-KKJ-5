import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { MenuButton } from "./menu-button";

export const MyPageButton = () => {
  const navigate = useNavigate();
  return (
    <MenuButton
      onClick={() => {
        navigate("/mypage");
      }}
    >
      <AccountCircleIcon fontSize={"inherit"} />
    </MenuButton>
  );
};
