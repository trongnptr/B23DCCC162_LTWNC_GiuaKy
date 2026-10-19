import { create } from 'zustand';
import type { Category } from '../types';

interface FilterState {
  searchTerm: string;
  category: Category | 'Tất cả';
  setSearchTerm: (term: string) => void;
  setCategory: (cat: Category | 'Tất cả') => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchTerm: '',
  category: 'Tất cả',
  setSearchTerm: (term) => set({ searchTerm: term }),
  setCategory: (cat) => set({ category: cat }),
}));