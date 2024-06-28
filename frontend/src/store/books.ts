import { Slice } from '.';
import { Book } from '@constants/types';

export interface bookStateSlice {
  userName: String;
  readListBooks: Book[];
  addToReadList?: (book: Book) => Promise<boolean>;
  addBooksToReadList: (books: Book[]) => void;
}

const READLIST_INITIAL_STATE = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverPhotoURL: 'https://bit.ly/2JrVk3X',
    readingLevel: 'High School',
  },
];

/**
 * Create independent slice
 * @param set - Set new value
 * @param get - Get value from store
 */
const bookStoreSlice: Slice<bookStateSlice> = (set, get) => ({
  userName: 'John Doe',
  readListBooks: [...READLIST_INITIAL_STATE],
  addToReadList: async (book) => {
    const newReadList = [...get().readListBooks, book];
    set({ readListBooks: newReadList });
    return true;
  },
  addBooksToReadList: (books: Book[]) => {
    set({ readListBooks: books });
  },
});

export default bookStoreSlice;
