import React, { useState } from 'react';
import { osintSources, signalTiers, socialFeed } from '../data/osintSources';
import { RefreshCw, Globe, MessageSquare, ExternalLink } from 'lucide-react';

const categoryMap = {
  gov: { label: 'Chính phủ & Tài trợ', icon: '🏛️', color: '#3b82f6' },
  think_tank: { label: 'Think Tanks', icon: '🔬', color: '#a855f7' },
  media: { label: 'Tech Media', icon: '📰', color: '#f59e0b' },
  kol: { label: 'KOLs & Innovators', icon: '👤', color: '#22d3a0' },
};

export default function DataCollection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const filtered = activeCategory === 'all' ? osintSources : osintSources.filter(s => s.category === activeCategory);

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>Thu thập Thông tin Nguồn mở & Lắng nghe Mạng xã hội</h1>
        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>NKG Social Compass — Hệ thống OSINT đa tầng · Phần 4</p>
      </div>

      {/* Signal tiers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
        {signalTiers.map(tier => (
          <div key={tier.level} style={{ background: tier.bgColor, border: `1px solid ${tier.borderColor}`, borderRadius: 8, padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 22 }}>{tier.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: tier.color }}>{tier.label}</div>
                <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>{tier.count} tín hiệu / ngày</div>
              </div>
            </div>
            <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 10 }}>{tier.description}</p>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Nguồn giám sát</div>
              {tier.sources.map(s => (
                <div key={s} style={{ fontSize: 10, color: 'var(--text-secondary)', padding: '2px 0', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ color: tier.color }}>▸</span> {s}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Ví dụ</div>
              {tier.examples.map(e => (
                <div key={e} style={{ fontSize: 10, color: 'var(--text-muted)', padding: '3px 6px', background: 'rgba(255,255,255,0.03)', borderRadius: 4, marginBottom: 3, fontStyle: 'italic' }}>"{e}"</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 12 }}>
        {/* Source Monitor Table */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">🌐 Bảng Giám sát Nguồn Chiến lược</span>
            <div style={{ display: 'flex', gap: 4 }}>
              <button onClick={() => setActiveCategory('all')} style={{ padding: '2px 8px', borderRadius: 4, border: 'none', fontSize: 9, fontWeight: 600, cursor: 'pointer', background: activeCategory === 'all' ? 'var(--brand)' : 'transparent', color: activeCategory === 'all' ? '#93bbff' : 'var(--text-muted)' }}>Tất cả</button>
              {Object.entries(categoryMap).map(([k, v]) => (
                <button key={k} onClick={() => setActiveCategory(k)} style={{ padding: '2px 8px', borderRadius: 4, border: 'none', fontSize: 9, fontWeight: 600, cursor: 'pointer', background: activeCategory === k ? 'var(--brand)' : 'transparent', color: activeCategory === k ? '#93bbff' : 'var(--text-muted)' }}>{v.label}</button>
              ))}
            </div>
          </div>
          <div className="panel-body" style={{ padding: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                  {['Nguồn', 'Khu vực', 'Trạng thái', 'Cập nhật', 'Tần suất', 'Tín hiệu'].map(h => (
                    <th key={h} style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', padding: '7px 10px', textAlign: 'left', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(src => {
                  const cat = categoryMap[src.category];
                  return (
                    <tr key={src.id} style={{ borderBottom: '1px solid var(--border-subtle)' }} className="card-hover">
                      <td style={{ padding: '8px 10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 12 }}>{cat.icon}</span>
                          <div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)' }}>{src.name}</div>
                            <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>{src.url}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '8px 10px', fontSize: 10, color: 'var(--text-secondary)' }}>{src.region}</td>
                      <td style={{ padding: '8px 10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <div style={{ width: 5, height: 5, borderRadius: '50%', background: src.status === 'live' ? '#22d3a0' : '#f59e0b' }} />
                          <span style={{ fontSize: 9, fontWeight: 600, color: src.status === 'live' ? '#22d3a0' : '#f59e0b', textTransform: 'uppercase' }}>{src.status}</span>
                        </div>
                      </td>
                      <td style={{ padding: '8px 10px', fontSize: 10, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{src.lastUpdate}</td>
                      <td style={{ padding: '8px 10px', fontSize: 10, color: 'var(--text-muted)' }}>{src.frequency}</td>
                      <td style={{ padding: '8px 10px', fontSize: 11, fontWeight: 700, color: 'var(--accent-green)', fontFamily: 'monospace' }}>{src.signals}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Social Feed */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">📱 Lắng nghe Mạng xã hội</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div className="pulse-dot" style={{ width: 5, height: 5 }} />
              <span style={{ fontSize: 9, color: 'var(--accent-green)' }}>Thời gian thực</span>
            </div>
          </div>
          <div className="panel-body" style={{ maxHeight: 480, overflowY: 'auto' }}>
            {socialFeed.map(post => {
              const sigColor = { weak: '#3b82f6', medium: '#f59e0b', strong: '#f43f5e' }[post.signal];
              const platColors = { X: '#1d9bf0', LinkedIn: '#0a66c2', Weibo: '#e6162d' };
              return (
                <div key={post.id} style={{ padding: '12px', borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', marginBottom: 8, borderLeft: `3px solid ${sigColor}` }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${platColors[post.platform]}22`, border: `1px solid ${platColors[post.platform]}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>
                      {post.platform === 'X' ? '𝕏' : post.platform === 'LinkedIn' ? 'in' : '微'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)' }}>{post.author}</span>
                        <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{post.time}</span>
                      </div>
                      <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{post.handle}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: post.translated ? 6 : 8 }}>{post.content}</p>
                  {post.translated && (
                    <div style={{ padding: '6px 8px', background: 'rgba(34,211,160,0.06)', borderRadius: 4, marginBottom: 8 }}>
                      <div style={{ fontSize: 9, color: '#22d3a0', marginBottom: 2, fontWeight: 600 }}>🇻🇳 Bản dịch</div>
                      <p style={{ fontSize: 10, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{post.translated}</p>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {post.tags.map(t => <span key={t} style={{ fontSize: 9, padding: '1px 5px', borderRadius: 4, background: `${sigColor}15`, color: sigColor, border: `1px solid ${sigColor}22` }}>{t}</span>)}
                    </div>
                    <div style={{ display: 'flex', gap: 10, fontSize: 9, color: 'var(--text-muted)' }}>
                      <span>♥ {post.likes.toLocaleString()}</span>
                      <span>↩ {post.rt.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
