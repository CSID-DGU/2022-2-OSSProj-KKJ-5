import { Typography } from "@mui/material";

interface IMainTitleProps {
  text: string;
}
export const MainTitle = ({ text }: IMainTitleProps) => {
  return (
    <Typography
      fontFamily={"bitbit"}
      fontSize={{ lg: "140px", md: "90px", sm: "65px", xs: "50px" }}
      variant={"h1"}
    >
      {text}
    </Typography>
  );
};
