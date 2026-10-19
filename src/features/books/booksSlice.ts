import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';import { isApiSuccess } from '../../types';
import type { Book } from '../../types';
import { fetchBooksApi } from '../../api/booksApi';

interface BooksState {
  items: Book[];
  borrowedIds: string[];
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  items: [],
  borrowedIds: [],
  loading: false,
  error: null,
};

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (shouldFail: boolean = false) => {
  const response = await fetchBooksApi(shouldFail);
  if (isApiSuccess(response)) {
    return response.data;
  }
  throw new Error(response.error);
});

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    borrowBook: (state, action: PayloadAction<string>) => {
      const book = state.items.find(b => b.id === action.payload);
      if (book && book.quantity > 0 && state.borrowedIds.length < 3 && !state.borrowedIds.includes(book.id)) {
        book.quantity -= 1;
        state.borrowedIds.push(book.id);
      }
    },
    returnBook: (state, action: PayloadAction<string>) => {
      const book = state.items.find(b => b.id === action.payload);
      if (book && state.borrowedIds.includes(book.id)) {
        book.quantity += 1;
        state.borrowedIds = state.borrowedIds.filter(id => id !== book.id);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Lỗi không xác định';
      });
  }
});

export const { borrowBook, returnBook } = booksSlice.actions;
export default booksSlice.reducer;