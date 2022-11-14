import { Scale } from "@mui/icons-material";
import { Box, Card, CardContent, Typography } from "@mui/material";

interface IMessageBoxProps {
  user: string;
  message: string;
  isUser: boolean;
}
export const MessageBox = ({ user, message, isUser }: IMessageBoxProps) => {
  const color = isUser ? "#87CEFA" : "#e5e5e5";
  return (
    <Box padding={`10px`}>
      {!isUser && <Typography>{user}</Typography>}
      <Card sx={{ backgroundColor: color }}>
        <CardContent>
          <Typography>{message}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
