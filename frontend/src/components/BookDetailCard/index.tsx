import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { Book } from '@/src/constants/types';

interface BookDetailCard {
  book: Book;
  handleAddBook: (book: Book) => void;
  loadingReadList?: boolean;
  readListBooks: Book[];
}

export const BookDetailCard = ({
  book,
  handleAddBook,
  loadingReadList,
  readListBooks,
}: BookDetailCard) => {
  const isInReadList = readListBooks?.some(
    (item) => item?.title === book?.title
  );
  return (
    <Card
      sx={{
        position: 'relative',
        color: 'white',
        maxWidth: 250,
        height: 270,
        border: '3px solid black',
        borderRadius: '16px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0px 0px 10px 2px #5a5a5a', // Transition for smooth effect // Default shadow
        minHeight: 240,
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-10px)', // Float effect
          borderRadius: '14px',
          boxShadow: '-9px 9px 18px #797878, 9px -9px 18px #ffffff',
        },
        '&:hover .hoverContent': {
          opacity: 1,
          maxHeight: '100%',
          transform: 'translateY(0)',
        },
        '&:hover .MuiCardContent-root': {
          borderTop: '2.7px solid black',
          height: '60%',
        },
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={book.coverPhotoURL}
        alt={book.title}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          transition: 'transform 0.5s ease',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
      />
      <CardContent
        sx={{
          position: 'absolute',
          bottom: 0,
          zIndex: 2,
          height: '40%',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          transition: 'height 0.5s ease',
          overflow: 'hidden',
        }}
      >
        <Typography
          color="primary.contrastText"
          gutterBottom
          variant="h6"
          component="div"
        >
          {book.title}
        </Typography>
        <Box
          className="hoverContent"
          sx={{
            opacity: 0,
            maxHeight: 0,
            transform: 'translateY(10px)',
            transition: 'all 0.5s ease',
          }}
        >
          <Typography variant="body2">Author: {book.author}</Typography>
          <Typography variant="body2">
            Reading Level: {book.readingLevel}
          </Typography>
        </Box>
        <Box
          display="flex"
          className="iconContainer"
          sx={{
            position: 'absolute',
            bottom: -25,
            right: -10,
            width: 80,
            height: 80,
            // display: 'flex',
            // alignItems: 'center',
            backgroundColor: isInReadList ? 'secondary.main' : 'primary.main',
            borderTopLeftRadius: '50%',
            padding: '8px',
            transition: 'width 0.3s ease, padding 0.3s ease',
            overflow: 'hidden',
            cursor: 'pointer',
            border: '3px solid black',
            '&:hover': {
              width: 'auto',
              padding: '8px 16px',
              borderTopLeftRadius: '36%',
              borderBottomLeftRadius: '0%',
              color: 'secondary.main',
            },
            '&:hover .actionText': {
              opacity: 1,
              transition: 'opacity 0.3s ease',
            },
            '&:hover .actionIcon': {
              opacity: 0,
              transition: 'opacity 0.3s ease',
            },
          }}
        >
          <Typography
            className="actionText"
            variant="body2"
            onClick={() => handleAddBook(book)}
            sx={{
              marginRight: 2,
              position: 'relative',
              fontSize: '16px',
              left: 0,
              top: 10,
              opacity: 0,
              marginLeft: 1,
              color: isInReadList ? 'primary.main' : 'secondary.main',
            }}
          >
            {!isInReadList && 'Add to reading list'}
            {isInReadList && 'Already in reading list'}
          </Typography>
          <Box
            className="actionIcon"
            sx={{
              position: 'absolute',
              top: 5,
              left: 10,
              borderRadius: '50%',
              width: '48px', // Adjust width to match the height
              height: '48px', // Set the height
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconButton
              disabled={isInReadList}
              aria-label="add to reading list"
              onClick={() => handleAddBook(book)}
              sx={{
                padding: 0,
                margin: 0,
                fontSize: '48px', // Increase icon size
                fontWeight: 'bold', // Make icon bold
                color: isInReadList ? 'primary.main' : 'secondary.main',

                // maxWidth: '100%', // Ensure the icon fills the button
                maxHeight: '50%',
                '&.Mui-disabled': {
                  color: 'primary.main', // Customize disabled color
                },
              }}
            >
              {isInReadList ? (
                <CheckIcon fontSize="inherit" />
              ) : (
                <AddIcon fontSize="inherit" />
              )}
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
