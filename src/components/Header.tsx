import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="nav-brand">HỆ THỐNG THƯ VIỆN</div>
      <div className="nav-menu">
        <Link to="/" className="nav-link">Danh mục Sách</Link>
        <Link to="/stats" className="nav-link">Thống kê</Link>
        <button className="btn btn-outline" onClick={toggleTheme}>
          Giao diện: {isDark ? 'Tối' : 'Sáng'}
        </button>
      </div>
    </nav>
  );
};

export default Header;