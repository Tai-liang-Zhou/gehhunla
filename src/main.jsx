import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import TableLookup from './pages/TableLookup';
import './styles.scss';
function App() {
  return <HashRouter><Routes>
    {/* 將來可將此路由替換為 <Home />，目前預設進入內頁。 */}
    <Route path="/" element={<Navigate to="/seating" replace />} />
    <Route path="/seating" element={<TableLookup />} />
    <Route path="*" element={<main className="not-found"><h1>這裡還沒有安排座位</h1><Link to="/seating">回到桌次查詢 →</Link></main>} />
  </Routes></HashRouter>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
