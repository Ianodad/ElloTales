import { gql } from '@apollo/client';
import { Book } from '../constants/types';

export const GET_BOOKS = gql`
  query GetBooks($offset: Int, $limit: Int, $sort: Boolean) {
    books(offset: $offset, limit: $limit, sort: $sort) {
      title
      author
      coverPhotoURL
      readingLevel
      inReadList @client
    }
  }
`;

export const GET_READING_LIST = gql`
  query {
    readingList {
      title
      author
      coverPhotoURL
      readingLevel
    }
  }
`;

export const SEARCH_BOOKS = gql`
  query SearchBooks($title: String!) {
    booksSearch(title: $title) {
      title
      author
      coverPhotoURL
      readingLevel
    }
  }
`;

export const ADD_BOOK_TO_READING_LIST = gql`
  mutation AddBookToReadingList($book: BookInput!) {
    addBookToReadingList(book: $book) {
      title
      author
      coverPhotoURL
      readingLevel
    }
  }
`;

export const DELETE_BOOK_FROM_READING_LIST = gql`
  mutation DeleteBookFromReadingList($title: String!) {
    deleteBookFromReadingList(title: $title) {
      title
      author
      coverPhotoURL
      readingLevel
    }
  }
`;

// add mutation to clearReadingList
export const CLEAR_READING_LIST = gql`
  mutation ClearReadingList {
    clearReadingList {
      success
      message
    }
  }
`;
