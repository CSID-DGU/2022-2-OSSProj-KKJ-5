import { Typography } from "@mui/material";

interface ISubTitleProps {
  text: string;
}
export const SubTitle = ({ text }: ISubTitleProps) => {
  return (
    <Typography fontFamily={"bitbit"} variant={"h3"}>
      {text}
    </Typography>
  );
};
