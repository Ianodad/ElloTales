import { gql } from '@apollo/client';

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
