import { DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { Button, Dialog, DialogActions, IconButton } from "@mui/material";
import { ChangeEvent } from "react";
import CloseIcon from "@mui/icons-material/Close";
interface ICraeteRoomDialog {
  roomName: string;
  open: boolean;
  handleRoomName: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
  createRoomHandler: () => void;
}
export const CreateRoomDialog = ({
  roomName,
  open,
  handleRoomName,
  handleClose,
  createRoomHandler,
}: ICraeteRoomDialog) => {
  return (
    <>
      <Dialog open={open}>
        <DialogTitle>
          {"create Room"}
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField value={roomName} onChange={handleRoomName} />
        </DialogContent>
        <DialogActions>
          <Button onClick={createRoomHandler}>{"create"}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
