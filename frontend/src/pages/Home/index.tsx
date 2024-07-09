import React, { useEffect, useState } from 'react';
import {
  MainLayout,
  BookDetailCard,
  MainHeader,
  SearchBar,
} from '@components/index';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import {
  GET_BOOKS,
  SEARCH_BOOKS,
  ADD_BOOK_TO_READING_LIST,
} from '@graphql/queries';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Box, Button, Grid, IconButton, Badge } from '@mui/material';
import { Refresh, MoreHoriz } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

import { Book } from '@constants/types';
import NotificationsIcon from '@mui/icons-material/Notifications';

import useElloTalesStore from '@/src/store';

const Home = () => {
  const [offset, setOffset] = useState(0);
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [triggerSearch, setTriggerSearch] = useState(false);
  // const [isSidebarVisible, toggleSidebar] = useSidebar();

  const {
    loading,
    error,
    data: someBooks,
  } = useQuery(GET_BOOKS, {
    variables: { offset, limit: 10, sort: false },
  });

  const [loadMoreBooks, { loading: loadingMore, data: moreBookData }] =
    useLazyQuery(GET_BOOKS, {
      variables: { offset, limit: 10, sort: false },
    });

  const [searchBooks, { loading: loadingSearch, data: searchData }] =
    useLazyQuery(SEARCH_BOOKS, {
      variables: { title: searchQuery },
    });

  const [addBookToReadingList, { loading: loadingReadList }] = useMutation(
    ADD_BOOK_TO_READING_LIST
  );

  const {
    readListBooks,
    addBooksToReadList,
    addToReadList,
    isSidebarVisible,
    toggleSidebar,
    readingListNewCacheCount,
  } = useElloTalesStore((state) => ({
    readListBooks: state.readListBooks,
    addBooksToReadList: state.addBooksToReadList,
    addToReadList: state.addToReadList,
    isSidebarVisible: state.isSidebarVisible,
    toggleSidebar: state.toggleSidebar,
    readingListNewCacheCount: state.readingListNewCacheCount,
  }));

  useEffect(() => {
    if (someBooks) {
      setBooks((prevBooks) => [...prevBooks, ...someBooks.books]);
    }
  }, [someBooks, readListBooks]);

  useEffect(() => {
    if (moreBookData) {
      setBooks((prevBooks) => [...prevBooks, ...moreBookData.books]);
    }
  }, [moreBookData, readListBooks]);

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + 10);
    loadMoreBooks({
      variables: { offset: offset + 10, limit: 10, sort: false },
    });
  };

  const handleSearch = () => {
    setTriggerSearch(true);
    if (searchQuery) {
      searchBooks({ variables: { title: searchQuery } });
    }
  };

  const handleAddBook = async (book: Book) => {
    const { __typename, inReadList, ...bookInput } = book;
    console.log('bookInput', bookInput);
    const oldReadListBooks = readListBooks;
    // Optimistically update the state
    addToReadList(bookInput);

    try {
      const response = await addBookToReadingList({
        variables: { book: bookInput },
      });
      console.log('response', response);
    } catch (err) {
      console.error('Error adding book to reading list:', err);

      // Revert the optimistic update if the server request fails
      addBooksToReadList(oldReadListBooks);
    }
  };

  useEffect(() => {
    if (searchData && triggerSearch) {
      setBooks(searchData.booksSearch);
    }
    if (!searchData && triggerSearch) {
      setBooks(someBooks);
    }
    setTriggerSearch(false);
  }, [searchData, triggerSearch]);

  const fetchSuggestions = async (event: any, value: any) => {
    if (value) {
      const { data: suggestionData } = await searchBooks({
        variables: { title: value },
      });
      if (suggestionData) {
        setSuggestions(
          suggestionData.booksSearch.map(
            (book: { title: String }) => book.title
          )
        );
      }
    } else {
      setSuggestions([]);
    }
  };

  if (loading && offset === 0) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log('books', books);
  return (
    <MainLayout>
      <Box sx={{ my: 4 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SearchBar
            suggestions={suggestions}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
            fetchSuggestions={fetchSuggestions}
            handleSearch={handleSearch}
            loadingSearch={loadingSearch}
          />
          <BookListIcon
            toggleSidebar={toggleSidebar}
            readingListNewCacheCount={readingListNewCacheCount}
          />
        </Box>
        <Grid container spacing={4}>
          {books.map((book, index) => (
            <Grid item xs={6} sm={6} md={3} lg={3} key={index}>
              <BookDetailCard
                book={book}
                handleAddBook={handleAddBook}
                loadingReadList={loadingReadList}
                readListBooks={readListBooks}
              />
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 4,
          }}
        >
          <IconButton
            color="primary"
            onClick={handleLoadMore}
            disabled={loadingMore}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '38px',
              width: '60px',
              height: '60px',
              borderRadius: '200px',
              backgroundColor: 'primary.main',
              border: '3px solid black',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                border: '2.8px solid black',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)',
              },
              '&:hover .inner-icon': {
                fontSize: '42px',
                transition: 'color 0.2s, font-size 0.2s',
              },
            }}
          >
            {loadingMore ? (
              <Refresh
                className="inner-icon"
                sx={{
                  fontSize: '58px',
                  color: 'secondary.main',
                  width: '20px',
                }}
              />
            ) : (
              <AddIcon
                className="inner-icon"
                fontSize="inherit"
                sx={{
                  color: 'secondary.main',
                }}
              />
            )}
          </IconButton>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Home;

interface BookListIconProps {
  toggleSidebar: () => void;
  readingListNewCacheCount: number;
}
const BookListIcon = ({
  toggleSidebar,
  readingListNewCacheCount,
}: BookListIconProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '16px',
        backgroundColor: 'primary.main',
        width: '60px',
        height: '60px',
        marginLeft: '12px',
        border: '3px solid black',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'white',
          border: '2.8px solid black',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)',
          transition: 'background-color 0.2s, box-shadow 0.2s',
        },
        '&:hover .bookListButton': {
          color: 'primary.main',
          fontSize: '38px',
          transition: 'color 0.2s, font-size 0.2s',
        },
      }}
    >
      <IconButton
        className="bookListButton"
        onClick={() => toggleSidebar()}
        sx={{
          fontSize: '34px',
          width: '20px',
          color: 'primary.contrastText',
        }}
      >
        <AutoStoriesIcon fontSize="inherit" />
      </IconButton>
      <Badge
        badgeContent={readingListNewCacheCount}
        color="secondary"
        sx={{
          position: 'absolute',
          top: 4,
          right: 4,
        }}
      ></Badge>
    </Box>
  );
};
