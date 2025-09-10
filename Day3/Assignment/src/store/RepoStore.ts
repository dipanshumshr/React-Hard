// src/store/searchStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// You can move this Repo type to a shared types.ts file to avoid duplication
type Repo = {
    id: number;
    full_name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    owner: {
        avatar_url: string;
    };
};

interface SearchState {
    searchTerm: string;
    searchResults: Repo[];
    setSearchTerm: (term: string) => void;
    setSearchResults: (results: Repo[]) => void;
}

export const useSearchStore = create<SearchState>()(
    persist(
        (set) => ({
            searchTerm: 'react',
            searchResults: [],

            setSearchTerm: (term: string) => set({ searchTerm: term }),
            setSearchResults: (results: Repo[]) => set({ searchResults: results }),
        }),
        {
            name: 'repo-storage',
        }
    )
);