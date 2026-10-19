export type Category = 'CNTT' | 'Kinh tế' | 'Ngoại ngữ';

export interface Book {
  id: string;
  title: string;
  author: string;
  category: Category;
  year: number;
  quantity: number;
  cover?: string; // Thêm trường ảnh bìa
}
// Utility types (Yêu cầu 1)
export type BookWithoutId = Omit<Book, 'id'>;
export type PartialBook = Partial<Book>;

// Generic API Response
export type ApiResponse<T> = 
  | { ok: true; data: T }
  | { ok: false; error: string };

// Type Guard
export const isApiSuccess = <T>(res: ApiResponse<T>): res is { ok: true; data: T } => {
  return res.ok === true;
};