import { Alert, Collapse } from "@mui/material";

interface IAlertMessage {
  isOpen: boolean;
  text: string;
}

export const AlertMessage = ({ isOpen, text }: IAlertMessage) => {
  return (
    <Collapse in={isOpen}>
      <Alert severity="error">{text}</Alert>
    </Collapse>
  );
};
