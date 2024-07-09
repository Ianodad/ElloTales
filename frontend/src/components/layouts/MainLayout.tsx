import { MainHeader, ReadListSidebar } from '@components/index';
import { Drawer, Button, Box, Container } from '@mui/material';
import React, { useState, useEffect } from 'react';
import useElloTalesStore from '@store/index';
import { useQuery } from '@apollo/client';
import { GET_READING_LIST } from '@/src/graphql/queries';
import { Book } from '@/src/constants/types';
import useSidebar from '@/src/hooks/useSIdebar';

export const MainLayout = ({ children }) => {
  // const [isSidebarVisible, toggleSidebar] = useSidebar();
  const { loading, error, data } = useQuery(GET_READING_LIST);

  const { isSidebarVisible, toggleSidebar } = useElloTalesStore((state) => ({
    isSidebarVisible: state.isSidebarVisible,
    toggleSidebar: state.toggleSidebar,
  }));

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default', // Background color for the bar
          px: 2, // Horizontal padding
          py: 1, // Vertical padding
          mb: 4, // Bottom margin for spacing
        }}
      >
        <MainHeader />
      </Box>
      <Container className="container">
        <Box className="content" flexGrow={2}>
          {children}
        </Box>
        <Drawer
          anchor="right"
          open={isSidebarVisible}
          onClose={toggleSidebar}
          sx={{
            '& .MuiDrawer-paper': {
              borderLeft: 'solid 3px black',
            },
          }}
        >
          <ReadListSidebar />
        </Drawer>
        {/* <Button
          onClick={toggleSidebar}
          variant="contained"
          color="primary"
          style={{ position: 'fixed', bottom: 20, right: 20 }}
        >
          {isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
        </Button> */}
      </Container>
    </>
  );
};
