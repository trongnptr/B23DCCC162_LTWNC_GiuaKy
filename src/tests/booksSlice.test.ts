import { describe, test, expect } from 'vitest';
import reducer, { borrowBook, returnBook } from '../features/books/booksSlice';

describe('booksSlice', () => {
  const initialState = { items: [], borrowedIds: [], loading: false, error: null };
  const stateWithBook = {
    ...initialState,
    items: [{ id: '1', title: 'Test', author: 'A', category: 'CNTT', year: 2020, quantity: 1 } as any]
  };

  test('1. Return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('2. Handle borrowBook - giảm quantity và thêm vào borrowedIds', () => {
    const nextState = reducer(stateWithBook, borrowBook('1'));
    expect(nextState.items[0].quantity).toBe(0);
    expect(nextState.borrowedIds).toContain('1');
  });

  test('3. Không cho mượn sách nếu quantity = 0', () => {
    const emptyBookState = { ...stateWithBook, items: [{ ...stateWithBook.items[0], quantity: 0 }] };
    const nextState = reducer(emptyBookState, borrowBook('1'));
    expect(nextState.borrowedIds).not.toContain('1');
  });

  test('4. Handle returnBook - tăng quantity và xoá khỏi borrowedIds', () => {
    const borrowedState = {
      ...stateWithBook,
      items: [{ ...stateWithBook.items[0], quantity: 0 }],
      borrowedIds: ['1']
    };
    const nextState = reducer(borrowedState, returnBook('1'));
    expect(nextState.items[0].quantity).toBe(1);
    expect(nextState.borrowedIds).not.toContain('1');
  });
});