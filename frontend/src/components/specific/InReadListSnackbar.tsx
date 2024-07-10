import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AlertColor } from '@mui/material/Alert';

interface InReadListSnackbarProps {
  open: boolean;
  setOpenSnackbar: (open: boolean) => void; // assuming setOpenSnackbar is a simple state setter
  alertSeverity: AlertColor;
  snackbarMessage: string;
}
export const InReadListSnackbar = ({
  open,
  setOpenSnackbar,
  alertSeverity,
  snackbarMessage,
}: InReadListSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpenSnackbar(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={() => setOpenSnackbar(false)}
        severity={alertSeverity}
        sx={{ width: '100%' }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};
