import React, { useEffect, useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchBooks, borrowBook, returnBook } from '../features/books/booksSlice';
import { useFilterStore } from '../store/filterStore';
import { useDebounce } from '../hooks/useDebounce';
import BookList from '../components/BookList';
import type { Book } from '../types';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error, borrowedIds } = useAppSelector(state => state.books);
  
  const { searchTerm, setSearchTerm, category, setCategory } = useFilterStore();
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    dispatch(fetchBooks(false));
  }, [dispatch]);

  const filteredBooks = useMemo(() => {
    return items.filter((book: Book) => {
      const matchSearch = book.title.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                          book.author.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchCat = category === 'Tất cả' || book.category === category;
      return matchSearch && matchCat;
    });
  }, [items, debouncedSearch, category]);

  const handleBorrow = useCallback((id: string) => { dispatch(borrowBook(id)); }, [dispatch]);
  const handleReturn = useCallback((id: string) => { dispatch(returnBook(id)); }, [dispatch]);

  if (loading) return <div style={{ padding: '20px' }}>Đang tải hệ thống...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Lỗi hệ thống: {error}</div>;

  return (
    <>
      <div className="filter-box">
        <input 
          type="text" 
          className="input-text"
          placeholder="Nhập tên sách hoặc tác giả để tìm kiếm..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="input-select"
          value={category} 
          onChange={(e) => setCategory(e.target.value as any)}
        >
          <option value="Tất cả">Tất cả thể loại</option>
          <option value="CNTT">Công nghệ thông tin</option>
          <option value="Kinh tế">Kinh tế</option>
          <option value="Ngoại ngữ">Ngoại ngữ</option>
        </select>
      </div>

      <h2 className="section-title">Danh sách tài liệu ({filteredBooks.length})</h2>

      <BookList 
        books={filteredBooks} 
        borrowedIds={borrowedIds} 
        onBorrow={handleBorrow} 
        onReturn={handleReturn} 
      />
    </>
  );
};

export default Home;