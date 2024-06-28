import { ReadListSidebar } from '@components/index';
import { Drawer, Button, Box, Container } from '@mui/material';
import React, { useState, useEffect } from 'react';
import useElloTalesStore from '@store/index';
import { useQuery } from '@apollo/client';
import { GET_READING_LIST } from '@/src/graphql/queries';
import { Book } from '@/src/constants/types';
import useSidebar from '@/src/hooks/useSIdebar';

export const MainLayout = ({ children }) => {
  const [isSidebarVisible, toggleSidebar] = useSidebar();
  const { loading, error, data } = useQuery(GET_READING_LIST);

  const { state, readListBooks, addToReadList, addBooksToReadList } =
    useElloTalesStore((state) => ({
      state: state,
      readListBooks: state.readListBooks,
      addToReadList: state.addToReadList,
      addBooksToReadList: state.addBooksToReadList,
    }));

  console.log(state);

  useEffect(() => {
    if (data && data.readingList) {
      addBooksToReadList(data.readingList);
    }
  }, [data, addToReadList]);
  return (
    <Container className="container">
      <Box className="content" flexGrow={2}>
        {children}
      </Box>
      <Drawer anchor="right" open={isSidebarVisible} onClose={toggleSidebar}>
        <ReadListSidebar />
      </Drawer>
      <Button
        onClick={toggleSidebar}
        variant="contained"
        color="primary"
        style={{ position: 'fixed', bottom: 20, right: 20 }}
      >
        {isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
      </Button>
    </Container>
  );
};
