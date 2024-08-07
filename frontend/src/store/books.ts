import { Slice } from '.';
import { Book } from '@constants/types';

export interface bookStateSlice {
  userName: String;
  readListBooks: Book[];
  isSidebarVisible: boolean;
  readingListNewCacheCount: number;
  addToReadList: (book: Book) => boolean;
  addBooksToReadList: (books: Book[]) => void;
  toggleSidebar: () => void;
}

/**
 * Create independent slice
 * @param set - Set new value
 * @param get - Get value from store
 */
const bookStoreSlice: Slice<bookStateSlice> = (set, get) => ({
  userName: 'John Doe',
  readListBooks: [],
  readingListNewCacheCount: 0,
  isSidebarVisible: false,
  addToReadList: (book: Book) => {
    const newReadList = [...get().readListBooks, book];
    set({
      readListBooks: newReadList,
      readingListNewCacheCount: get().readingListNewCacheCount + 1,
    });
    return true;
  },
  addBooksToReadList: (books: Book[]) =>
    set((state) => ({
      readListBooks: books,
    })),
  toggleSidebar: () =>
    set((state) => ({
      isSidebarVisible: !state.isSidebarVisible,
      readingListNewCacheCount: 0,
    })),
  setReadingListNewCacheCount: () =>
    set((state) => ({
      readingListNewCacheCount: state.readingListNewCacheCount + 1,
    })),
});

export default bookStoreSlice;
