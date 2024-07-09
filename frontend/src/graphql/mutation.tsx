import { gql } from '@apollo/client';

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

export const CLEAR_READING_LIST = gql`
  mutation ClearReadingList {
    clearReadingList {
      success
      message
    }
  }
`;
