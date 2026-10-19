import type { Book, ApiResponse } from '../types';

const mockBooks: Book[] = [
  // --- Thể loại: CNTT ---
  { id: '1', title: 'Clean Code: A Handbook of Agile Software Craftsmanship', author: 'Robert C. Martin', category: 'CNTT', year: 2008, quantity: 2 },
  { id: '4', title: 'Design Patterns: Elements of Reusable Object-Oriented Software', author: 'Erich Gamma', category: 'CNTT', year: 1994, quantity: 0 }, // Hết sách
  { id: '5', title: 'You Don\'t Know JS: Scope & Closures', author: 'Kyle Simpson', category: 'CNTT', year: 2014, quantity: 5 },
  { id: '6', title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'CNTT', year: 1999, quantity: 3 },
  { id: '13', title: 'Grokking Algorithms', author: 'Aditya Bhargava', category: 'CNTT', year: 2016, quantity: 4 },
  
  // --- Thể loại: Kinh tế ---
  { id: '2', title: 'Kinh tế vĩ mô', author: 'N. Gregory Mankiw', category: 'Kinh tế', year: 2010, quantity: 1 },
  { id: '7', title: 'The Lean Startup', author: 'Eric Ries', category: 'Kinh tế', year: 2011, quantity: 4 },
  { id: '8', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', category: 'Kinh tế', year: 2011, quantity: 0 }, // Hết sách
  { id: '9', title: 'Rich Dad Poor Dad', author: 'Robert T. Kiyosaki', category: 'Kinh tế', year: 1997, quantity: 6 },
  { id: '14', title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', category: 'Kinh tế', year: 1936, quantity: 8 },
  
  // --- Thể loại: Ngoại ngữ ---
  { id: '3', title: 'Hack não 1500 từ tiếng Anh', author: 'Step Up', category: 'Ngoại ngữ', year: 2018, quantity: 5 },
  { id: '10', title: 'English Grammar in Use', author: 'Raymond Murphy', category: 'Ngoại ngữ', year: 2012, quantity: 2 },
  { id: '11', title: 'Minna no Nihongo Shokyu I', author: '3A Corporation', category: 'Ngoại ngữ', year: 1998, quantity: 3 },
  { id: '12', title: 'Fluent in 3 Months', author: 'Benny Lewis', category: 'Ngoại ngữ', year: 2014, quantity: 1 },
  { id: '15', title: 'IELTS Cambridge 18', author: 'Cambridge University Press', category: 'Ngoại ngữ', year: 2023, quantity: 0 }, // Hết sách
];

export const fetchBooksApi = (shouldFail = false): Promise<ApiResponse<Book[]>> => {
  return new Promise((resolve) => {
    // Giả lập độ trễ mạng 500ms
    setTimeout(() => {
      if (shouldFail) {
        resolve({ ok: false, error: 'Lỗi tải dữ liệu từ máy chủ! Vui lòng thử lại sau.' });
      } else {
        resolve({ ok: true, data: mockBooks });
      }
    }, 500); 
  });
};