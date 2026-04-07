import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Download, Grid, List, ChevronDown, ThumbsUp, MessageCircle, Share2, Flag } from 'lucide-react';
import { POSTS, SENTIMENT_CONFIG, SIGNAL_CONFIG, SOURCE_TYPE_ICON } from '../data/posts';

export default function PostsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sentiment, setSentiment] = useState('all');
  const [signal, setSignal] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const filtered = useMemo(() => POSTS.filter(p => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (sentiment !== 'all' && p.sentiment !== sentiment) return false;
    if (signal !== 'all' && p.signalLevel !== signal) return false;
    return true;
  }), [search, sentiment, signal]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Filter header */}
      <div style={{ padding: '10px 16px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <h1 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: 0 }}>Bài viết Thu thập</h1>
          <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>OSINT Collection</span>
          <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 600, color: 'var(--accent-green)', background: 'var(--accent-green-dim)', padding: '2px 8px', borderRadius: 999 }}>{filtered.length} bài viết</span>
          <button style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Download size={10} />Tải xuống
          </button>
        </div>
        {/* Search + filters */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'var(--surface-hover)', border: '1px solid var(--border)', borderRadius: 6, padding: '5px 10px', flex: '0 0 240px' }}>
            <Search size={12} color="var(--text-muted)" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm trong bài viết..." style={{ background: 'transparent', border: 'none', color: 'var(--text)', fontSize: 11, flex: 1, padding: 0 }} />
          </div>

          <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Sắc thái:</span>
          {['all', 'positive', 'neutral', 'negative'].map(s => {
            const c = s !== 'all' ? SENTIMENT_CONFIG[s] : null;
            return (
              <button key={s} onClick={() => setSentiment(s)} style={{ padding: '3px 9px', borderRadius: 999, fontSize: 10, fontWeight: sentiment === s ? 700 : 400, border: `1px solid ${sentiment === s && c ? c.color + '66' : 'var(--border)'}`, background: sentiment === s && c ? c.bg : 'transparent', color: sentiment === s && c ? c.color : sentiment === s ? 'var(--accent-blue)' : 'var(--text-muted)', cursor: 'pointer' }}>
                {s === 'all' ? 'Tất cả' : `${c.icon} ${c.label}`}
              </button>
            );
          })}

          <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Tín hiệu:</span>
          {['all', 'strong', 'medium', 'weak'].map(s => {
            const c = s !== 'all' ? SIGNAL_CONFIG[s] : null;
            return (
              <button key={s} onClick={() => setSignal(s)} style={{ padding: '3px 9px', borderRadius: 999, fontSize: 10, fontWeight: signal === s ? 700 : 400, border: `1px solid ${signal === s && c ? c.color + '55' : 'var(--border)'}`, background: signal === s && c ? c.color + '15' : 'transparent', color: signal === s && c ? c.color : signal === s ? 'var(--accent-blue)' : 'var(--text-muted)', cursor: 'pointer' }}>
                {s === 'all' ? 'Tất cả' : c.label}
              </button>
            );
          })}

          <div style={{ marginLeft: 'auto', display: 'flex', gap: 3 }}>
            <button onClick={() => setViewMode('grid')} style={{ padding: '5px 7px', borderRadius: 4, border: `1px solid ${viewMode === 'grid' ? 'var(--accent-blue)' : 'var(--border)'}`, background: viewMode === 'grid' ? 'rgba(59,130,246,0.12)' : 'transparent', color: viewMode === 'grid' ? '#3b82f6' : 'var(--text-muted)', cursor: 'pointer' }}><Grid size={12} /></button>
            <button onClick={() => setViewMode('list')} style={{ padding: '5px 7px', borderRadius: 4, border: `1px solid ${viewMode === 'list' ? 'var(--accent-blue)' : 'var(--border)'}`, background: viewMode === 'list' ? 'rgba(59,130,246,0.12)' : 'transparent', color: viewMode === 'list' ? '#3b82f6' : 'var(--text-muted)', cursor: 'pointer' }}><List size={12} /></button>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(340px, 1fr))' : '1fr', gap: 10 }}>
          {filtered.map(post => {
            const sc = SENTIMENT_CONFIG[post.sentiment];
            const sig = SIGNAL_CONFIG[post.signalLevel];
            return (
              <div key={post.id} className="card-hover" onClick={() => navigate(`/post/${post.id}`)} style={{ cursor: 'pointer', background: 'var(--surface)', border: `1px solid var(--border)`, borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {/* Card header */}
                <div style={{ padding: '10px 12px 8px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ fontSize: 14 }}>{SOURCE_TYPE_ICON[post.sourceType] || '🌐'}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)' }}>{post.source}</div>
                    <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>Đã đăng lúc {post.pubTime}</div>
                  </div>
                  <input type="checkbox" onClick={(e) => e.stopPropagation()} style={{ width: 14, height: 14, cursor: 'pointer', accentColor: '#3b82f6' }} />
                </div>

                {/* Card body */}
                <div style={{ padding: '10px 12px', flex: 1 }}>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 7, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 999, background: sc.bg, color: sc.color }}>{sc.icon} {sc.label}</span>
                    <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 999, background: sig.color + '15', color: sig.color }}>● {sig.label}</span>
                    {post.tags.slice(0, 2).map(t => <span key={t} style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>{t}</span>)}
                  </div>
                  <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)', lineHeight: 1.5, margin: 0 }}>
                    {post.title.length > 140 ? post.title.slice(0, 140) + '...' : post.title}
                    {post.title.length > 140 && <span style={{ color: 'var(--accent-blue)', cursor: 'pointer', fontSize: 11 }}> Xem thêm</span>}
                  </p>
                </div>

                {/* Card footer */}
                <div style={{ padding: '7px 12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[
                      { icon: <ThumbsUp size={11} />, val: post.likes },
                      { icon: <MessageCircle size={11} />, val: post.comments },
                      { icon: <Share2 size={11} />, val: post.shares },
                    ].map((a, i) => (
                      <button key={i} onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px 4px', borderRadius: 4 }}>
                        {a.icon} {a.val.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  {/* Sentiment status */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: sc.color, padding: '3px 8px', borderRadius: 999, background: sc.bg }}>
                    {sc.icon} {sc.label} <ChevronDown size={9} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
