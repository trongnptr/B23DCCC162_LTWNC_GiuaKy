import React from 'react';
import type { Book } from '../types';
import BookItem from './BookItem';

interface BookListProps {
  books: Book[];
  borrowedIds: string[];
  onBorrow: (id: string) => void;
  onReturn: (id: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, borrowedIds, onBorrow, onReturn }) => {
  if (books.length === 0) {
    return <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '1.2rem' }}>🚫 Không tìm thấy sách nào phù hợp.</div>;
  }

  return (
    <div className="book-grid">
      {books.map((book: Book) => (
        <BookItem 
          key={book.id} 
          book={book} 
          isBorrowed={borrowedIds.includes(book.id)}
          onBorrow={onBorrow}
          onReturn={onReturn}
        />
      ))}
    </div>
  );
};

export default BookList;