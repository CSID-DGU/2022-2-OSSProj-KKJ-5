import { useNavigate } from "react-router-dom";

export const SignInButton = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/signin");
      }}
    >
      {"Login"}
    </div>
  );
};
