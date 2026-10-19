import '@testing-library/jest-dom/vitest';
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookItem from '../components/BookItem';

describe('BookItem Component', () => {
  const mockBook = { id: '1', title: 'React', author: 'Dan', category: 'CNTT' as any, year: 2020, quantity: 2 };
  const mockOnBorrow = vi.fn();
  const mockOnReturn = vi.fn();

  test('1. Hiển thị đúng thông tin sách', () => {
    render(<BookItem book={mockBook} isBorrowed={false} onBorrow={mockOnBorrow} onReturn={mockOnReturn} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText(/Tác giả: Dan/)).toBeInTheDocument();
  });

  test('2. Click mượn gọi đúng hàm với id', async () => {
    render(<BookItem book={mockBook} isBorrowed={false} onBorrow={mockOnBorrow} onReturn={mockOnReturn} />);
    const btn = screen.getByText('Mượn sách');
    await userEvent.click(btn);
    expect(mockOnBorrow).toHaveBeenCalledWith('1');
  });

  test('3. Nút bị vô hiệu hoá khi hết sách', () => {
    const zeroBook = { ...mockBook, quantity: 0 };
    render(<BookItem book={zeroBook} isBorrowed={false} onBorrow={mockOnBorrow} onReturn={mockOnReturn} />);
    const btn = screen.getByText('Hết sách');
    expect(btn).toBeDisabled();
  });
});