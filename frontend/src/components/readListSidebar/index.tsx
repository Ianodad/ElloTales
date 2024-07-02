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
} from '@/src/graphql/queries';
import { useMutation } from '@apollo/client';
import DeleteIcon from '@mui/icons-material/Delete';

export const ReadListSidebar = () => {
  const { readListBooks, addToReadList } = useElloTalesStore((state) => ({
    readListBooks: state.readListBooks,
    addToReadList: state.addToReadList,
  }));

  const [deleteBookFromReadingList, { loading }] = useMutation(
    DELETE_BOOK_FROM_READING_LIST
  );
  const setReadListBooks = useElloTalesStore(
    (state) => state.addBooksToReadList
  );
  console.log(readListBooks);

  const handleDeleteBookReadingList = async (title: string) => {
    try {
      const response = await deleteBookFromReadingList({
        variables: { title },
        update: (cache, { data: { deleteBookFromReadingList } }) => {
          const existingBooks =
            cache.readQuery({ query: GET_READING_LIST }).readingList || [];
          const newBooks = existingBooks.filter(
            (book: Book) => book.title !== title
          );
          cache.writeQuery({
            query: GET_READING_LIST,
            data: { readingList: newBooks },
          });

          // Update Zustand store
          console.log('newBooks', newBooks);
          setReadListBooks(newBooks);
        },
      });
    } catch (err) {
      console.error('Error deleting book from reading list:', err);
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
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          READING LIST
        </Typography>
      </Box>
      <List style={{ gap: '16px' }}>
        {readListBooks.length > 0 ? (
          readListBooks.map((book: Book, index: number) => (
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
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No books in the reading list" />
          </ListItem>
        )}
      </List>
    </Box>
  );
};
