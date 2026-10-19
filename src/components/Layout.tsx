import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Library, Moon, Sun, LayoutDashboard, BarChart2 } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-brand">
          <Library size={24} /> Mini Library
        </div>
        <div className="nav-profile">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <LayoutDashboard size={18} /> Bảng điều khiển
          </Link>
          <Link to="/stats" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '16px' }}>
            <BarChart2 size={18} /> Thống kê
          </Link>
          <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '16px', color: 'inherit' }}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div style={{ width: '1px', height: '24px', background: 'var(--border-color)', margin: '0 12px' }}></div>
          <div className="avatar">T</div>
          <span>Nguyễn Phú Trọng</span>
        </div>
      </nav>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;