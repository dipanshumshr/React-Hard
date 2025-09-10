import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type BookmarkState = {
    bookmarks: number[];
    showBookmarkOnly : boolean
    addBookmark: (id: number) => void;
    removeBookmark: (id: number) => void;
    toggleShowBookmark: () => void;
}

export const useBookmarkStore = create<BookmarkState>()(
    persist(
        (set) => ({
            bookmarks: [],
            showBookmarkOnly : false,

            addBookmark: (id: number) =>
                set((state) => {
                    if (state.bookmarks.includes(id)) {
                        return state;
                    }
                    return { bookmarks: [...state.bookmarks, id] };
                }),

            removeBookmark: (id: number) =>
                set((state) => ({
                    bookmarks: state.bookmarks.filter((bookmarkId) => bookmarkId !== id),
                })),

            toggleShowBookmark : () => 
                set((state) => ({
                    showBookmarkOnly : !state.showBookmarkOnly
                }))
        }),
        
        {
            name: 'bookmark-storage',
        }
    )
);