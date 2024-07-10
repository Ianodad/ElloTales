import React, { useEffect, useState } from 'react';
import {
  MainLayout,
  BookDetailCard,
  RenderError,
  SearchBar,
  BookListIcon,
} from '@components/index';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import {
  GET_BOOKS,
  SEARCH_BOOKS,
  ADD_BOOK_TO_READING_LIST,
} from '@graphql/index';
import {
  Backdrop,
  CircularProgress,
  Box,
  Grid,
  IconButton,
} from '@mui/material';
import { Refresh } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

import { Book } from '@constants/types';

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
    const oldReadListBooks = readListBooks;
    // Optimistically update the state
    addToReadList(bookInput);

    try {
      await addBookToReadingList({
        variables: { book: bookInput },
      });
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

  if (error) return <RenderError error={error} />;

  return (
    <MainLayout>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading || loadingMore}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
