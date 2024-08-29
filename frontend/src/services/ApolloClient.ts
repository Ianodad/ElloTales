import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { GET_READING_LIST } from '@graphql/index';
import { Book } from '../constants/types';

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000/';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) {
    console.log(
      `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
    );
  }
});

// Define the HTTP link for connecting to your GraphQL server
const httpLink = new HttpLink({
  uri: BACKEND_URL,
});
export const readingListVar = makeVar([]);

const cache = new InMemoryCache({
  typePolicies: {
    Book: {
      fields: {
        inReadList: {
          read(_, { readField, toReference, cache }) {
            const title = readField('title');
            const readListBooks =
              cache.readQuery({ query: GET_READING_LIST })?.readingList || [];
            return readListBooks?.some((item: Book) => item.title === title);
          },
        },
      },
    },
  },
});

// Create the Apollo Client instance
const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
  },
});

export default client;
