import {
  Box,
  Autocomplete,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';

interface SearchBarProps {
  suggestions: string[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  fetchSuggestions: (event: React.ChangeEvent<{}>, value: string) => void;
  handleSearch: (event: React.ChangeEvent<{}>, value: string) => void;
  loadingSearch: boolean;
}

export const SearchBar = ({
  suggestions,
  searchQuery,
  setSearchQuery,
  fetchSuggestions,
  handleSearch,
  loadingSearch,
}: SearchBarProps) => {
  const classes = useStyles();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 0',
      }}
    >
      <Box></Box>
      <Autocomplete
        freeSolo
        options={suggestions}
        onInputChange={fetchSuggestions}
        sx={{
          '.MuiAutocomplete-inputRoot': {
            borderRadius: '14px',
            border: '2px black solid',
            '&:hover': {
              border: '2px solid blue', // Change the border color on hover
            },
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Search by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              mr: 2,
              width: '20em',
              maxWidth: '23em',
              minWidth: '20em',
              border: '3px solid black',
              borderRadius: '16px',
              fontWeight: 'bold',
              '& label': {
                color: 'primary.main',
              },
            }}
          />
        )}
      ></Autocomplete>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '16px',
          backgroundColor: 'primary.main',
          width: '60px',
          height: '60px',
          border: '3px solid black',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'white',
            border: '2.8px solid black',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)',
          },
          '&:hover .searchButton': {
            color: 'primary.main',
            fontSize: '42px',
            transition: 'color 0.2s, font-size 0.2s',
          },
        }}
      >
        <IconButton
          className="searchButton"
          // variant="contained"
          onClick={() => handleSearch(null, searchQuery)}
          disabled={loadingSearch}
          sx={{
            fontSize: '38px',
            color: 'primary.contrastText',
          }}
          // startIcon={
          //   loadingSearch ? <CircularProgress size={20} /> : <SearchIcon />
          // }
        >
          {loadingSearch && (
            <CircularProgress
              sx={{
                fontSize: '38px',
                width: '20px',
                color: 'primary.contrastText',
              }}
            />
          )}
          {!loadingSearch && <SearchIcon fontSize="inherit" />}
        </IconButton>
      </Box>
    </Box>
  );
};
