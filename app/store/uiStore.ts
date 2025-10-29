import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SortOrder = 'newest' | 'oldest' | 'a-z' | 'z-a';
export type FilterType = 'all' | 'active' | 'completed';

interface UiState {
  searchQuery: string;
  sortOrder: SortOrder;
  filterType: FilterType;
  setSearchQuery: (query: string) => void;
  setSortOrder: (order: SortOrder) => void;
  setFilterType: (type: FilterType) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    set => ({
      searchQuery: '',
      sortOrder: 'newest',
      filterType: 'all',
      setSearchQuery: (query: string) => set({ searchQuery: query }),
      setSortOrder: (order: SortOrder) => set({ sortOrder: order }),
      setFilterType: (type: FilterType) => set({ filterType: type }),
    }),
    {
      name: 'ui-storage',
      partialize: state => ({
        searchQuery: state.searchQuery,
        sortOrder: state.sortOrder,
        filterType: state.filterType,
      }),
    }
  )
);
