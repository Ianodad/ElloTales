import React, { useEffect, useState } from 'react';
import { MainLayout } from '@components/index';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_BOOKS, SEARCH_BOOKS } from '@graphql/queries';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  TextField,
  Autocomplete,
} from '@mui/material';
import { Book } from '@constants/types';

const Home = () => {
  const [offset, setOffset] = useState(0);
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [triggerSearch, setTriggerSearch] = useState(false);

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

  useEffect(() => {
    if (someBooks) {
      setBooks(someBooks.books);
    }
  }, [someBooks]);

  useEffect(() => {
    if (moreBookData) {
      setBooks((prevBooks) => [...prevBooks, ...moreBookData.books]);
    }
  }, [moreBookData]);

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + 10);
    loadMoreBooks();
  };

  const handleSearch = () => {
    setTriggerSearch(true);
    if (searchQuery) {
      searchBooks({ variables: { title: searchQuery } });
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

  const fetchSuggestions = async (event, value) => {
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

  return (
    <MainLayout>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Book List
        </Typography>
        <Box sx={{ display: 'flex', mb: 4 }}>
          <Autocomplete
            freeSolo
            options={suggestions}
            onInputChange={fetchSuggestions}
            // onChange={handleSearch}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Search by title"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ mr: 2, width: '400px' }}
              />
            )}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSearch(null, searchQuery)}
            disabled={loadingSearch}
          >
            {loadingSearch ? 'Searching...' : 'Search'}
          </Button>
        </Box>
        <Grid container spacing={4}>
          {books.map(
            (book: {
              title: string;
              author: string;
              readingLevel: string;
              coverPhotoURL: string;
            }) => (
              <Grid item xs={12} sm={6} md={3} lg={3} key={book.title}>
                <Card
                  sx={{
                    borderTopLeftRadius: 16, // Customize radius as needed
                    borderBottomRightRadius: 16, // Customize radius as needed
                    borderTopRightRadius: 0,
                    borderBottomLeftRadius: 0,
                    p: 2,
                    mb: 0,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={book.coverPhotoURL}
                    alt={book.title}
                    sx={{
                      objectFit: 'fill',
                      borderTopRightRadius: 16, // Customize radius as needed
                      borderBottomLeftRadius: 16, // Customize radius as needed
                      borderBottomRightRadius: 0,
                      borderTopLeftRadius: 0,
                      boxShadow:
                        '0 4px 6px rgba(0,0,0,.15), 0 2px 4px rgba(0,0,0,.1)',
                    }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {book.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="secondary.contrastText"
                      component="p"
                    >
                      Author: {book.author}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="secondary.contrastText"
                      component="p"
                    >
                      Reading Level: {book.readingLevel}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                        },
                      }}
                    >
                      Add to Reading List
                      <AutoStoriesIcon sx={{ marginRight: 1, mt: 1 }} />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )
          )}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? 'Loading...' : 'Load More'}
          </Button>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Home;
