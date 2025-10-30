import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SortOrder, FilterType } from '@/app/types';

interface UiState {
  searchQuery: string;
  sortOrder: SortOrder;
  filterType: FilterType;
  selectedTags: string[];
  setSearchQuery: (query: string) => void;
  setSortOrder: (order: SortOrder) => void;
  setFilterType: (type: FilterType) => void;
  setSelectedTags: (tags: string[]) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    set => ({
      searchQuery: '',
      sortOrder: 'newest',
      filterType: 'all',
      selectedTags: [],
      setSearchQuery: (query: string) => set({ searchQuery: query }),
      setSortOrder: (order: SortOrder) => set({ sortOrder: order }),
      setFilterType: (type: FilterType) => set({ filterType: type }),
      setSelectedTags: (tags: string[]) => set({ selectedTags: tags }),
    }),
    {
      name: 'ui-storage',
      partialize: state => ({
        searchQuery: state.searchQuery,
        sortOrder: state.sortOrder,
        filterType: state.filterType,
        selectedTags: state.selectedTags,
      }),
    }
  )
);
