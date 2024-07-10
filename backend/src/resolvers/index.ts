/* eslint-disable indent */
import { booksData } from '../data/books';
import { readReadingListData, writeReadingListData } from '../utils/index';
import { Book } from '../constants/types';

export const resolvers = {
  Query: {
    books: (
      _: unknown,
      args: { offset: number; limit: number; sort: boolean }
    ) => {
      const { offset, limit, sort } = args;
      const sortedData = [...booksData].sort((a, b) =>
        a.title.localeCompare(b.title)
      );

      return sort
        ? sortedData.slice(offset, offset + limit)
        : booksData.slice(offset, offset + limit);
    },
    booksSearch: (_parent: unknown, args: { title: string }) => {
      const { title } = args;
      return title
        ? booksData.filter((book) =>
            book.title.toLowerCase().includes(title.toLowerCase())
          )
        : booksData;
    },
    readingList: () => readReadingListData(),
  },
  Mutation: {
    addBookToReadingList: (_parent: unknown, args: { book: Book }) => {
      const { book } = args;
      if (book === null) {
        throw new Error('Book cannot be null');
      }
      const readingList = readReadingListData();
      readingList.push(book);
      writeReadingListData(readingList);
      return readingList;
    },
    deleteBookFromReadingList: (
      _parent: never,
      { title }: { title: string }
    ) => {
      try {
        const readingList = readReadingListData();

        const updatedReadingList = readingList.filter(
          (book: Book) => book.title !== title
        );

        writeReadingListData(updatedReadingList);

        return updatedReadingList;
      } catch (error) {
        throw new Error('Unable to delete book from reading list.');
      }
    },
    clearReadingList: async () => {
      // Your logic to clear the reading list data
      await writeReadingListData([]);
      return { success: true, message: 'Reading list cleared successfully' };
    },
  },
};
