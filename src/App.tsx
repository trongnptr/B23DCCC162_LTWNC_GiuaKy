import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Header from './components/Header';
import Home from './pages/Home';

// Lazy load
const Stats = React.lazy(() => import('./pages/Stats'));

const AppContent = () => {
  const { isDark } = useTheme();
  return (
    <div style={{ minHeight: '100vh', background: isDark ? '#333' : '#FFF', color: isDark ? '#FFF' : '#000' }}>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<div>Đang tải trang...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}

export default App;