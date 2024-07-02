import bookStoreSlice, { bookStateSlice } from './books';

// import { combineAndImmer, zustandLogger } from "@scandinavia/ts-zustand";
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { StateCreator, create } from 'zustand';

export type Store = bookStateSlice;

export type Slice<T> = StateCreator<
  Store,
  [
    ['zustand/persist', unknown],
    ['zustand/immer', never],
    ['zustand/devtools', never],
  ],
  [],
  T
>;

const useElloTalesStore = create<Store>()(
  devtools(
    immer(
      persist(
        (...a) => ({
          ...bookStoreSlice(...a),
        }),
        {
          name: 'ello-tales',
          onRehydrateStorage: (state) => {},
        }
      )
    )
  )
);

export default useElloTalesStore;
