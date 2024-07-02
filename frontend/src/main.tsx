import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from '@services/ApolloClient.ts';
import Home from '@pages/Home';
import theme from './theme';

import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <GlobalStyles
        styles={{ body: { backgroundColor: theme.palette.background.default } }}
      /> */}
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>
);
