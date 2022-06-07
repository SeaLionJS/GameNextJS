import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InfoIcon from "@mui/icons-material/Info";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";

import { Grid, iconClasses } from "@mui/material";

export default function GDialog({
  visible,
  onAgree,
  onCancel,
  header,
  text,
  type,
}) {
  const style = { width: 120, height: 120 };

  const icons = {
    info: <InfoIcon color="info" sx={style} />,
    error: <ErrorIcon color="error" sx={style} />,
    warning: <WarningIcon color="warning" sx={style} />,
  };

  const icon = icons[type];

  return (
    <Dialog open={visible} onClose={onCancel}>
      <DialogTitle id="alert-dialog-title">{header}</DialogTitle>
      <DialogContent>
        <Grid container direction="row" alignItems="center" maxWidth={600}>
          <Grid item xs={12} sm align="center">
            {icon}
          </Grid>
          <Grid item xs={12} sm={8} align="justify">
            {text}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onAgree}>Так</Button>
        {onCancel ? (
          <Button onClick={onCancel} autoFocus>
            Ні
          </Button>
        ) : (
          ""
        )}
      </DialogActions>
    </Dialog>
  );
}
