import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
export const MainLayout = ({ children }) => {
  return <Container className="content-center">{children}</Container>;
};
