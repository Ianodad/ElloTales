export const typeDefs = `#graphql
  type Book {
    title: String
    author: String
    coverPhotoURL: String
    readingLevel: String
  }

  input BookInput {
  title: String!
  author: String!
  coverPhotoURL: String!
  readingLevel: String!
 }
 type ClearReadingListResponse {
  success: Boolean!
  message: String
}
 
  type Query {
    books(offset: Int, limit: Int, sort: Boolean): [Book]
    readingList: [Book!]!
    booksSearch(title: String!): [Book!]
  }

  type Mutation {
  addBookToReadingList(book: BookInput!): [Book!]!
  deleteBookFromReadingList(title: String!): [Book!]!
  clearReadingList: ClearReadingListResponse
}
`;
