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
  ListItemSecondaryAction,
} from '@mui/material';
import { Book } from '@/src/constants/types';
import {
  DELETE_BOOK_FROM_READING_LIST,
  GET_READING_LIST,
} from '@/src/graphql/queries';
import { useMutation } from '@apollo/client';

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
    <Box width={250} padding={2}>
      <Typography variant="h6">READING LIST</Typography>
      <List>
        {readListBooks.length > 0 ? (
          readListBooks.map((book: Book, index: number) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar src={book.coverPhotoURL} alt={book.title} />
              </ListItemAvatar>
              <ListItemText
                primary={book.title}
                secondary={`${book.author} - Level: ${book.readingLevel}`}
              />
              <ListItemSecondaryAction>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    handleDeleteBookReadingList(book.title);
                  }}
                >
                  Delete
                </Button>
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
