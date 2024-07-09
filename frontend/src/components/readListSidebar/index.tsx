import React, { useEffect } from 'react';
import useElloTalesStore from '@store/index';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Drawer,
  Button,
  IconButton,
  ListItemSecondaryAction,
} from '@mui/material';
import { Book } from '@/src/constants/types';
import {
  DELETE_BOOK_FROM_READING_LIST,
  GET_READING_LIST,
  CLEAR_READING_LIST,
} from '@/src/graphql/queries';
import { useMutation } from '@apollo/client';
import DeleteIcon from '@mui/icons-material/Delete';

export const ReadListSidebar = () => {
  const { addBooksToReadList, readListBooks } = useElloTalesStore((state) => ({
    addBooksToReadList: state.addBooksToReadList,
    readListBooks: state.readListBooks,
  }));

  const [deleteBookFromReadingList, { loading }] = useMutation(
    DELETE_BOOK_FROM_READING_LIST
  );

  const [clearReadingList] = useMutation(CLEAR_READING_LIST);

  const handleDeleteBookReadingList = async (title: string) => {
    // Optimistically update the state
    const optimisticNewBooks = readListBooks.filter(
      (book: Book) => book.title !== title
    );
    addBooksToReadList(optimisticNewBooks);

    try {
      const response = await deleteBookFromReadingList({
        variables: { title },
      });
    } catch (err) {
      console.error('Error deleting book from reading list:', err);
      addBooksToReadList(readListBooks);
    }
  };

  const handleClearReadingList = async () => {
    try {
      const response = await clearReadingList();
      if (response.data.clearReadingList.success) {
        addBooksToReadList([]);
        console.log(response.data.clearReadingList.message);
      }
    } catch (error) {
      console.error('Error clearing reading list:', error);
    }
  };

  return (
    <Box width={300} padding={2}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={1}
        mb={1}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            '&::after': {
              content: '""',
              display: 'block',
              width: '35px',
              height: '3px',
              backgroundColor: 'secondary.main', // Secondary color for the underline
              margin: '8px auto 0', // Center the underline
            },
          }}
        >
          READING LIST
        </Typography>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box display="flex" flexDirection="column" alignItems="left">
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {readListBooks.length} books
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="right">
          <Button
            variant="contained"
            color="error"
            onClick={handleClearReadingList}
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'primary.main',
              boxShadow: 'none',
              fontSize: '0.8em', // Reduced font size
              marginLeft: 'auto', // Float right
              ':hover': {
                textDecoration: 'underline',
                backgroundColor: 'transparent',
                boxShadow: 'none',
              },
              ':active': {
                boxShadow: 'none',
              },
              ':focus': {
                boxShadow: 'none',
              },
            }}
          >
            Clear List
          </Button>
        </Box>
      </Box>

      <List style={{ gap: '16px' }}>
        {readListBooks.length > 0 ? (
          readListBooks.map(
            (book: Book, index: number) =>
              book && (
                <ListItem
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '3px solid black',
                    borderRadius: '16px',
                    boxShadow: '0px 3px 6px 2px #5a5a5a',
                    backgroundColor: 'info.main',
                    padding: '16px',
                    marginBottom: '8px',
                  }}
                  key={index}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{ width: 50, height: 50 }}
                      style={{
                        border: 'solid 3px',
                        borderColor: 'black',
                        borderStyle: 'solid',
                        borderWidth: '3px',
                        display: 'inline-block',
                      }}
                      src={book.coverPhotoURL}
                      alt={book.title}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={book.title}
                    style={{ marginRight: '22px' }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      color="error"
                      onClick={() => {
                        handleDeleteBookReadingList(book.title);
                      }}
                      sx={{
                        fontSize: '20px',
                        '&:hover': {
                          backgroundColor: 'error.main',
                          color: 'white',
                          fontSize: '23px',
                          transition:
                            'background-color 0.2s, color 0.2s, font-size 0.2s',
                        },
                      }}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
          )
        ) : (
          <ListItem>
            <ListItemText primary="No books in the reading list" />
          </ListItem>
        )}
      </List>
    </Box>
  );
};
