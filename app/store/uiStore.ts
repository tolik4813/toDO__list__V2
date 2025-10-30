import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SortOrder, FilterType } from '@/app/types';

interface UiState {
  searchQuery: string;
  sortOrder: SortOrder;
  filterType: FilterType;
  selectedTags: string[];
  showLanguageSwitcher: boolean;
  showTagFilter: boolean;
  showTagInput: boolean;
  showSearch: boolean;
  showProgress: boolean;
  showFilterButtons: boolean;
  showSortDropdown: boolean;
  showMarquee: boolean;
  isMenuOpen: boolean;
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
      | 'showSortDropdown'
      | 'showMarquee',
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
      showLanguageSwitcher: true,
      showTagFilter: true,
      showTagInput: true,
      showSearch: true,
      showProgress: true,
      showFilterButtons: true,
      showSortDropdown: true,
      showMarquee: true,
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
        showMarquee: state.showMarquee,
        isMenuOpen: state.isMenuOpen,
      }),
    }
  )
);
