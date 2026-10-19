import React, { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import type { RootState } from '../store';
import type { Book } from '../types';

const Stats: React.FC = () => {
  const { items, borrowedIds } = useAppSelector((state: RootState) => state.books);

  const stats = useMemo(() => {
    const counts: Record<string, number> = {};
    items.forEach((book: Book) => {
      counts[book.category] = (counts[book.category] || 0) + 1;
    });
    return counts;
  }, [items]);

  return (
    <div>
      <h2 className="section-title">Báo cáo Thống kê</h2>
      <div className="stat-panel">
        <p style={{ fontSize: '1.1rem' }}>Số sách sinh viên đang mượn: <strong>{borrowedIds.length}</strong></p>
        
        <h4 style={{ marginTop: '30px', color: 'var(--text-secondary)' }}>PHÂN BỔ ĐẦU SÁCH THEO THỂ LOẠI</h4>
        <ul>
          {Object.entries(stats).map(([cat, count]) => (
            <li key={cat}>
              <span>{cat}</span>
              <strong>{count} đầu sách</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Stats;