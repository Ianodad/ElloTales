import React from 'react';
import { Alert } from '@mui/material';
import { ApolloError } from '@apollo/client';

// Define the type for the error prop based on ApolloError
interface RenderErrorProps {
  error: ApolloError;
}

// RenderError component with proper typing
export const RenderError: React.FC<RenderErrorProps> = ({ error }) => {
  return <Alert severity="error">{error.message}</Alert>;
};
