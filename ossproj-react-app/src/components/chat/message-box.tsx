import { Scale } from "@mui/icons-material";
import { Box, Card, CardContent, Typography } from "@mui/material";

interface IMessageBoxProps {
  user: string;
  message: string;
  isUser: boolean;
}
export const MessageBox = ({ user, message, isUser }: IMessageBoxProps) => {
  return (
    <Box width={`30%`} padding={`10px`}>
      <Typography>{user}</Typography>
      <Card>
        <CardContent>
          <Typography>{message}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
