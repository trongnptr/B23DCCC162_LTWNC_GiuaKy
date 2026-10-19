import React from 'react';
import type { Book } from '../types';
import { Monitor, TrendingUp, Globe, BookOpen } from 'lucide-react';

interface Props {
  book: Book;
  isBorrowed: boolean;
  onBorrow: (id: string) => void;
  onReturn: (id: string) => void;
}

// Hàm chọn Icon và màu nền theo thể loại
const getCategoryTheme = (category: string) => {
  switch (category) {
    case 'CNTT':
      return {
        icon: <Monitor size={48} color="#ffffff" strokeWidth={1.5} />,
        background: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)', // Xanh dương
      };
    case 'Kinh tế':
      return {
        icon: <TrendingUp size={48} color="#ffffff" strokeWidth={1.5} />,
        background: 'linear-gradient(135deg, #2e7d32 0%, #81c784 100%)', // Xanh lá
      };
    case 'Ngoại ngữ':
      return {
        icon: <Globe size={48} color="#ffffff" strokeWidth={1.5} />,
        background: 'linear-gradient(135deg, #7b1fa2 0%, #ba68c8 100%)', // Tím
      };
    default:
      return {
        icon: <BookOpen size={48} color="#ffffff" strokeWidth={1.5} />,
        background: 'linear-gradient(135deg, #455a64 0%, #90a4ae 100%)', // Xám
      };
  }
};

const BookItem: React.FC<Props> = React.memo(({ book, isBorrowed, onBorrow, onReturn }) => {
  const isAvailable = book.quantity > 0;
  const theme = getCategoryTheme(book.category);

  return (
    <div className="book-card" data-testid={`book-${book.id}`}>
      
      {/* Khối bìa giả lập bằng Icon + Gradient */}
      <div className="book-icon-cover" style={{ background: theme.background }}>
        {theme.icon}
      </div>
      
      <div className="book-card-content">
        <h3 className="book-card-title">{book.title}</h3>
        
        <p className="book-card-info">Mã tài liệu: <strong>{book.id}</strong></p>
        <p className="book-card-info">Thể loại: <strong>{book.category}</strong></p>
        <p className="book-card-info">Tác giả: <strong>{book.author}</strong></p>
        <p className="book-card-info">Năm xuất bản: <strong>{book.year}</strong></p>
        
        <div className="book-card-footer">
          <span className={`status-badge ${isAvailable ? 'status-ok' : 'status-none'}`}>
            Tồn kho: {book.quantity}
          </span>

          {isBorrowed ? (
            <button className="btn btn-danger" onClick={() => onReturn(book.id)}>
              Hoàn trả
            </button>
          ) : (
            <button 
              className="btn btn-primary"
              onClick={() => onBorrow(book.id)} 
              disabled={!isAvailable}
            >
              {isAvailable ? 'Mượn sách' : 'Hết sách'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export default BookItem;