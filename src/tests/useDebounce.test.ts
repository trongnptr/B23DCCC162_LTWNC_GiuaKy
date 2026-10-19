import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../hooks/useDebounce';

describe('useDebounce', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  test('Debounce value update sau delay', () => {
    const { result, rerender } = renderHook(({ val, delay }) => useDebounce(val, delay), {
      initialProps: { val: 'a', delay: 300 }
    });

    expect(result.current).toBe('a');

    rerender({ val: 'ab', delay: 300 });
    // Giá trị chưa đổi ngay lập tức
    expect(result.current).toBe('a');

    // Chạy tới timeout
    act(() => { vi.advanceTimersByTime(300); });
    expect(result.current).toBe('ab');
  });
});