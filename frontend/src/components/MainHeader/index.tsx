import React from 'react';
import { Typography } from '@mui/material';

export const MainHeader = () => {
  return (
    <Typography
      variant="h4"
      component="h1"
      sx={{
        mb: 2,
        fontWeight: 'bold', // Bold font weight for emphasis
        fontFamily: 'Roboto, sans-serif', // Custom font family
        color: 'primary.main', // Primary color from the theme
        textAlign: 'center', // Center align the text
        textTransform: 'uppercase', // Uppercase letters for a strong visual impact
        letterSpacing: '0.1em', // Slight letter spacing for readability
        mt: 4, // Add top margin for spacing
        '&::after': {
          content: '""',
          display: 'block',
          width: '50px',
          height: '4px',
          backgroundColor: 'secondary.main', // Secondary color for the underline
          margin: '8px auto 0', // Center the underline
        },
      }}
    >
      ELLOTALES
    </Typography>
  );
};
