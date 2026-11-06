import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar.jsx';
import Footer from '../components/layout/Footer.jsx';
import Icon from '../components/common/Icon.jsx';

function MainLayout() {
  const [open, setOpen] = useState(false); // state controls the mobile sidebar
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="shell">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="main">
        <header className="topbar">
          <button className="menu-toggle" aria-label="Open menu" onClick={() => setOpen(true)}><Icon name="menu" /></button>
          <span className="date">{today}</span>
          <span className="user-chip"><span className="avatar">A</span> Admin</span>
        </header>
        <main className="container"><Outlet /></main>
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
