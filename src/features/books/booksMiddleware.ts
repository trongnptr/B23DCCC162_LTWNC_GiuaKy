import type { Middleware } from '@reduxjs/toolkit';

export const borrowLimitMiddleware: Middleware = store => next => action => {
  if ((action as any).type === 'books/borrowBook') {
    const state = store.getState();
    if (state.books.borrowedIds.length >= 3) {
      alert('Bạn chỉ được mượn tối đa 3 cuốn sách cùng lúc!');
      return; // Chặn action
    }
  }
  return next(action);
};