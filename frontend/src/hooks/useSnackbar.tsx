import { useState } from 'react';
import { AlertColor } from '@mui/material/Alert';

// Custom hook
export const useSnackbar = () => {
  // State to track the snackbar visibility
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // State to track the message to be displayed in the snackbar
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // State to track the severity of the snackbar alert (success or error)
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success');

  // Function to show the snackbar with a message and severity
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setAlertSeverity(severity);
    setOpenSnackbar(true); // Open the snackbar
  };

  // Function to close the snackbar
  const closeSnackbar = () => {
    setOpenSnackbar(false); // Close the snackbar
  };

  return {
    openSnackbar,
    setOpenSnackbar: closeSnackbar, // Pass in a function to close snackbar for better API design
    alertSeverity,
    snackbarMessage,
    showSnackbar,
  };
};
