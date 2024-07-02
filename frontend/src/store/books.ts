import { Slice } from '.';
import { Book } from '@constants/types';

export interface bookStateSlice {
  userName: String;
  readListBooks: Book[];
  isSidebarVisible: boolean;
  readingListNewCacheCount: number;
  addToReadList?: (book: Book) => Promise<boolean>;
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
  addToReadList: async (book) => {
    const newReadList = [...get().readListBooks, book];
    set({ readListBooks: newReadList });
    return true;
  },
  addBooksToReadList: (books: Book[]) =>
    set((state) => ({
      readListBooks: books,
      readingListNewCacheCount: state.readingListNewCacheCount + 1,
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
