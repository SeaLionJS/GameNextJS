import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function GDialog({ visible, onAgree, onCancel }) {
  if (!visible) return "";
  return (
    <Dialog
      open={visible}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Вам буде зарахована поразка"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Ви впевнені?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onAgree}>Так</Button>
        <Button onClick={onCancel} autoFocus>
          Ні
        </Button>
      </DialogActions>
    </Dialog>
  );
}
