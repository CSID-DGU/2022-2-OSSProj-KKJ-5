import { useNavigate } from "react-router-dom";

export const SignOutButton = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate("/signIn");
      }}
    >
      {"LogOut"}
    </div>
  );
};
