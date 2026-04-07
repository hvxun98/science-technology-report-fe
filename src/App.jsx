import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { Newspaper, Rss, BarChart2, Bell, Bot, ChevronLeft, ChevronRight, FileText, Eye, LayoutDashboard, Globe } from 'lucide-react';
import Today from './pages/Today';
import IntelFeed from './pages/IntelFeed';
import VNTracker from './pages/VNTracker';
import Alerts from './pages/Alerts';
import PostsPage from './pages/PostsPage';
import ReportsPage from './pages/ReportsPage';
import MonitoringPage from './pages/MonitoringPage';
import GeoMap from './pages/GeoMap';
import PostDetail from './pages/PostDetail';
import { tickerMessages } from './data/techSignals';

const navGroups = [
  {
    label: 'Chính',
    items: [
      { path: '/', icon: LayoutDashboard, label: 'Hôm nay', sub: 'Bản tin tóm tắt' },
      // { path: '/feed', icon: Rss, label: 'Bản tin tình báo', sub: 'Tin AI phân tích' },
      { path: '/alerts', icon: Bell, label: 'Cảnh báo', sub: 'Tín hiệu khẩn', badge: 3 },
    ]
  },
  {
    label: 'Phân tích',
    items: [
      { path: '/tracker', icon: BarChart2, label: 'Theo dõi VN', sub: 'Nghị quyết 57' },
      { path: '/posts', icon: Newspaper, label: 'Bài viết', sub: 'Thu thập tin tức' },
      { path: '/monitoring', icon: Eye, label: 'Giám sát nguồn', sub: 'Quản lý thu thập' },
    ]
  },
  {
    label: 'Báo cáo',
    items: [
      { path: '/reports', icon: FileText, label: 'Xuất Báo cáo', sub: 'Trợ lý soạn thảo' },
    ]
  },
];

function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();
  const now = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour12: false });

  return (
    <aside style={{
      width: collapsed ? 54 : 216,
      minWidth: collapsed ? 54 : 216,
      background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.22s ease, min-width 0.22s ease',
      overflow: 'hidden', flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '12px 10px 10px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 9, minHeight: 52 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #1e4079, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 15, boxShadow: '0 0 14px rgba(59,130,246,0.35)' }}>🧭</div>
        {!collapsed && (
          <div>
            <div style={{ fontWeight: 800, fontSize: 12, letterSpacing: '0.04em', color: 'var(--text)' }}>NKG COMPASS</div>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Intelligence Platform</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px 6px', overflowY: 'auto' }}>
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '8px 8px 4px' }}>{group.label}</div>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <NavLink key={item.path} to={item.path} style={{ textDecoration: 'none', display: 'block', marginBottom: 2 }}>
                  <div className={`nav-item ${active ? 'active' : ''}`} title={collapsed ? item.label : ''}
                    style={{ padding: collapsed ? '9px' : '7px 10px', justifyContent: collapsed ? 'center' : 'flex-start', position: 'relative' }}>
                    <Icon size={14} style={{ flexShrink: 0 }} />
                    {!collapsed && (
                      <>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 12, fontWeight: 500 }}>{item.label}</div>
                          <div style={{ fontSize: 9, color: active ? 'rgba(147,187,255,0.6)' : 'var(--text-muted)' }}>{item.sub}</div>
                        </div>
                        {item.badge && (
                          <div style={{ width: 17, height: 17, borderRadius: '50%', background: 'var(--accent-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff' }}>{item.badge}</div>
                        )}
                      </>
                    )}
                    {collapsed && item.badge && (
                      <div style={{ position: 'absolute', top: 3, right: 3, width: 13, height: 13, borderRadius: '50%', background: 'var(--accent-red)', fontSize: 8, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.badge}</div>
                    )}
                  </div>
                </NavLink>
              );
            })}
            {!collapsed && <div style={{ height: 4 }} />}
          </div>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div style={{ padding: '8px 12px 10px', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
            <div className="pulse-dot" /><span style={{ fontSize: 10, color: 'var(--accent-green)' }}>Hệ thống đang chạy</span>
          </div>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>{now}</div>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 1 }}>47 nguồn · 3 AI hoạt động</div>
        </div>
      )}

      <button onClick={() => setCollapsed(!collapsed)} style={{ padding: '7px', background: 'transparent', border: 'none', borderTop: '1px solid var(--border)', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
      >
        {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
      </button>
    </aside>
  );
}

function Header() {
  const duplicated = [...tickerMessages, ...tickerMessages];
  return (
    <header style={{ height: 34, background: 'var(--surface)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', flexShrink: 0, overflow: 'hidden' }}>
      <div style={{ padding: '0 12px', display: 'flex', alignItems: 'center', gap: 6, borderRight: '1px solid var(--border)', height: '100%', flexShrink: 0 }}>
        <div className="pulse-dot" /><span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent-green)', letterSpacing: '0.08em' }}>LIVE</span>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', height: '100%', display: 'flex', alignItems: 'center' }}>
        <div className="ticker-track">
          {duplicated.map((msg, i) => <span key={i} style={{ paddingRight: 72, fontSize: 11, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{msg}</span>)}
        </div>
      </div>
      <div style={{ padding: '0 12px', display: 'flex', alignItems: 'center', gap: 10, borderLeft: '1px solid var(--border)', height: '100%', flexShrink: 0 }}>
        <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>NKG v2.1</span>
      </div>
    </header>
  );
}

function AppContent() {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 1024);
  const location = useLocation();
  const isFullScreenMap = location.pathname === '/geomap';

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {!isFullScreenMap && <Header />}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {!isFullScreenMap && <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />}
        <main style={{ flex: 1, overflow: 'hidden', background: 'var(--bg)' }}>
          <Routes>
            <Route path="/" element={<Today />} />
            <Route path="/feed" element={<IntelFeed />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/tracker" element={<VNTracker />} />
            <Route path="/geomap" element={<GeoMap />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/monitoring" element={<MonitoringPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return <BrowserRouter><AppContent /></BrowserRouter>;
}
