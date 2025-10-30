import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SortOrder, FilterType } from '@/app/types';

interface UiState {
  searchQuery: string;
  sortOrder: SortOrder;
  filterType: FilterType;
  selectedTags: string[];
  // toggles
  showLanguageSwitcher: boolean;
  showTagFilter: boolean;
  showTagInput: boolean;
  showSearch: boolean;
  showProgress: boolean;
  showFilterButtons: boolean;
  showSortDropdown: boolean;
  // menu
  isMenuOpen: boolean;
  // setters
  setSearchQuery: (query: string) => void;
  setSortOrder: (order: SortOrder) => void;
  setFilterType: (type: FilterType) => void;
  setSelectedTags: (tags: string[]) => void;
  setToggle: (
    key:
      | 'showLanguageSwitcher'
      | 'showTagFilter'
      | 'showTagInput'
      | 'showSearch'
      | 'showProgress'
      | 'showFilterButtons'
      | 'showSortDropdown',
    value: boolean
  ) => void;
  setMenuOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    set => ({
      searchQuery: '',
      sortOrder: 'newest',
      filterType: 'all',
      selectedTags: [],
      // default: all on
      showLanguageSwitcher: true,
      showTagFilter: true,
      showTagInput: true,
      showSearch: true,
      showProgress: true,
      showFilterButtons: true,
      showSortDropdown: true,
      isMenuOpen: false,
      setSearchQuery: (query: string) => set({ searchQuery: query }),
      setSortOrder: (order: SortOrder) => set({ sortOrder: order }),
      setFilterType: (type: FilterType) => set({ filterType: type }),
      setSelectedTags: (tags: string[]) => set({ selectedTags: tags }),
      setToggle: (key, value) =>
        set(state => ({ ...(state as UiState), [key]: value }) as UiState),
      setMenuOpen: (open: boolean) => set({ isMenuOpen: open }),
    }),
    {
      name: 'ui-storage',
      partialize: state => ({
        searchQuery: state.searchQuery,
        sortOrder: state.sortOrder,
        filterType: state.filterType,
        selectedTags: state.selectedTags,
        showLanguageSwitcher: state.showLanguageSwitcher,
        showTagFilter: state.showTagFilter,
        showTagInput: state.showTagInput,
        showSearch: state.showSearch,
        showProgress: state.showProgress,
        showFilterButtons: state.showFilterButtons,
        showSortDropdown: state.showSortDropdown,
        isMenuOpen: state.isMenuOpen,
      }),
    }
  )
);
