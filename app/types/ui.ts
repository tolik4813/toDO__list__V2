export type SortOrder = 'newest' | 'oldest' | 'a-z' | 'z-a';
export type FilterType = 'all' | 'active' | 'completed';
export type LanguageCode = 'en' | 'uk';

export interface UiState {
  searchQuery: string;
  sortOrder: SortOrder;
  filterType: FilterType;
}

export interface LanguageSwitcherProps {
  className?: string;
}
