import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, Globe, Zap, ChevronRight, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, LineChart, Line, CartesianGrid, Area, AreaChart } from 'recharts';
import { signalAlerts, tickerMessages } from '../data/techSignals';
import { nghiQuyet57KPIs } from '../data/nghiQuyet57';

function SignalCard({ signal }) {
  const colorMap = { critical: '#f43f5e', high: '#f97316', medium: '#f59e0b', low: '#22d3a0', info: '#3b82f6' };
  const strengthBg = { strong: 'rgba(244,63,94,0.06)', medium: 'rgba(245,158,11,0.06)', weak: 'rgba(59,130,246,0.06)' };
  const color = colorMap[signal.severity] || '#888';

  return (
    <div className="card-hover" style={{
      background: strengthBg[signal.strength], border: `1px solid ${color}22`,
      borderRadius: 8, padding: '12px 14px', marginBottom: 8,
      borderLeft: `3px solid ${color}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', lineHeight: 1.4, flex: 1 }}>{signal.title}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
          <span style={{ fontSize: 9, color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{signal.severity}</span>
        </div>
      </div>
      <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 8 }}>{signal.impact}</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {signal.tags.map(t => (
            <span key={t} style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>{t}</span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{signal.source}</span>
          <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{signal.time}</span>
          <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 4, background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>✓ {signal.confidence}%</span>
        </div>
      </div>
    </div>
  );
}

function KPICard({ kpi }) {
  const pct = kpi.isRank ? Math.max(0, 100 - (kpi.current - 1) * 10) : Math.min(100, (kpi.current / kpi.target2030) * 100);
  const sparkData = Array.from({ length: 12 }, (_, i) => ({ v: kpi.current * (0.75 + i * 0.025 + Math.random() * 0.02) }));

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{kpi.category}</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{kpi.label}</div>
        </div>
        <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 999, background: kpi.trendUp ? 'rgba(34,211,160,0.12)' : 'rgba(244,63,94,0.12)', color: kpi.trendUp ? '#22d3a0' : '#f43f5e', fontWeight: 700 }}>
          {kpi.trend}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
        <span style={{ fontSize: 24, fontWeight: 800, color: kpi.color, fontFamily: 'JetBrains Mono, monospace' }}>{kpi.current}</span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{kpi.unit}</span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 'auto' }}>→ {kpi.target2030}{kpi.unit}</span>
      </div>
      <div className="progress-bar" style={{ marginBottom: 6 }}>
        <div className="progress-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${kpi.color}88, ${kpi.color})` }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{Math.round(pct)}% đến mục tiêu 2030</span>
        <ResponsiveContainer width={80} height={24}>
          <AreaChart data={sparkData}>
            <Area type="monotone" dataKey="v" stroke={kpi.color} fill={kpi.color + '22'} strokeWidth={1.5} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [activeStr, setActiveStr] = useState('all');
  const filtered = activeStr === 'all' ? signalAlerts : signalAlerts.filter(s => s.strength === activeStr);
  const strong = signalAlerts.filter(s => s.strength === 'strong');
  const medium = signalAlerts.filter(s => s.strength === 'medium');
  const weak = signalAlerts.filter(s => s.strength === 'weak');

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: '16px' }}>
      {/* Page header */}
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>Màn hình Tổng quan — Radar Screen</h1>
          <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>Giám sát thời gian thực · Cập nhật lúc {new Date().toLocaleTimeString('vi-VN')}</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span className="badge badge-green"><span className="pulse-dot" style={{ width: 5, height: 5 }} />Theo dõi liên tục</span>
          <span className="badge badge-red">3 cảnh báo khẩn</span>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 16 }}>
        {[
          { label: 'Tín hiệu Mạnh', value: strong.length, icon: '🚨', color: '#f43f5e' },
          { label: 'Tín hiệu Trung', value: medium.length, icon: '🔭', color: '#f59e0b' },
          { label: 'Tín hiệu Yếu', value: weak.length, icon: '📡', color: '#3b82f6' },
          { label: 'Nguồn đang quét', value: 47, icon: '🌐', color: '#22d3a0' },
        ].map((stat, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 20 }}>{stat.icon}</span>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: stat.color, fontFamily: 'JetBrains Mono, monospace', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        {/* Signal Alerts Panel */}
        <div className="panel" style={{ gridColumn: '1 / 2' }}>
          <div className="panel-header">
            <span className="panel-title">⚡ Tín hiệu Cảnh báo</span>
            <div style={{ display: 'flex', gap: 4 }}>
              {['all', 'strong', 'medium', 'weak'].map(s => (
                <button key={s} onClick={() => setActiveStr(s)} style={{
                  padding: '2px 8px', borderRadius: 4, border: 'none', fontSize: 9, fontWeight: 600, cursor: 'pointer',
                  background: activeStr === s ? 'var(--brand)' : 'transparent',
                  color: activeStr === s ? '#93bbff' : 'var(--text-muted)',
                  textTransform: 'capitalize'
                }}>{s === 'all' ? 'Tất cả' : s}</button>
              ))}
            </div>
          </div>
          <div className="panel-body" style={{ maxHeight: 380, overflowY: 'auto' }}>
            {filtered.map(s => <SignalCard key={s.id} signal={s} />)}
          </div>
        </div>

        {/* KPI Alignment Panel */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">📊 Quản trị Mục tiêu — Nghị quyết 57</span>
            <span className="badge badge-brand">2025 → 2030</span>
          </div>
          <div className="panel-body" style={{ maxHeight: 380, overflowY: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {nghiQuyet57KPIs.slice(0, 6).map(kpi => <KPICard key={kpi.id} kpi={kpi} />)}
            </div>
          </div>
        </div>
      </div>

      {/* Tech Heatmap + Action Screen */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">🌍 Bản đồ Công nghệ Toàn cầu 2025-2026</span>
          </div>
          <div className="panel-body">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Lĩnh vực', 'Công nghệ đột phá', 'Mức trưởng thành', 'Tín hiệu toàn cầu', 'VN sẵn sàng'].map(h => (
                    <th key={h} style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', padding: '6px 8px', textAlign: 'left', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { field: '🧠 AI & Tính toán', breakthrough: 'Agentic AI, World Models', maturity: 'commercial', global: 94, vn: 42 },
                  { field: '⚛️ Lượng tử', breakthrough: 'PQC Migration, Qubit Error Correction', maturity: 'emerging', global: 71, vn: 18 },
                  { field: '🤖 Robot & LEO', breakthrough: 'Humanoid, D2D Satellite', maturity: 'scaling', global: 68, vn: 31 },
                  { field: '🧬 Y sinh', breakthrough: 'GLP-1, mRNA Gen-2, CRISPR', maturity: 'scaling', global: 79, vn: 24 },
                  { field: '⚡ Vật liệu & Năng lượng', breakthrough: 'Solid-State Battery, Perovskite', maturity: 'emerging', global: 65, vn: 29 },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '8px', fontSize: 11, fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap' }}>{row.field}</td>
                    <td style={{ padding: '8px', fontSize: 10, color: 'var(--text-secondary)' }}>{row.breakthrough}</td>
                    <td style={{ padding: '8px' }}>
                      <span className={`maturity-${row.maturity}`}>
                        {row.maturity === 'commercial' ? 'Thương mại' : row.maturity === 'emerging' ? 'Tiệm cận' : 'Mở rộng'}
                      </span>
                    </td>
                    <td style={{ padding: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ flex: 1, height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${row.global}%`, background: '#3b82f6', borderRadius: 2 }} />
                        </div>
                        <span style={{ fontSize: 10, color: 'var(--text-secondary)', width: 28, textAlign: 'right', fontFamily: 'monospace' }}>{row.global}</span>
                      </div>
                    </td>
                    <td style={{ padding: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ flex: 1, height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${row.vn}%`, background: row.vn >= 40 ? '#22d3a0' : row.vn >= 25 ? '#f59e0b' : '#f43f5e', borderRadius: 2 }} />
                        </div>
                        <span style={{ fontSize: 10, color: 'var(--text-secondary)', width: 28, textAlign: 'right', fontFamily: 'monospace' }}>{row.vn}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Screen */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">🎯 Màn hình Hành động</span>
          </div>
          <div className="panel-body">
            {[
              { priority: 'KHẨN', title: 'Đánh giá rủi ro chuỗi cung ứng chip', timeframe: '2 tuần', color: '#f43f5e', actor: 'Bộ KH&ĐT' },
              { priority: 'CAO', title: 'Xây dựng AI Sandbox regulation theo EU', timeframe: '1 tháng', color: '#f59e0b', actor: 'Bộ TT&TT' },
              { priority: 'CAO', title: 'FDI window cho semiconductor packaging', timeframe: '2 tháng', color: '#f59e0b', actor: 'Thủ tướng' },
              { priority: 'TRUNG', title: 'Chương trình học bổng 1,000 kỹ sư chip/năm', timeframe: '3 tháng', color: '#3b82f6', actor: 'Bộ GD&ĐT' },
              { priority: 'TRUNG', title: 'Khung đánh giá AI risk cho cơ quan công quyền', timeframe: '4 tháng', color: '#3b82f6', actor: 'Bộ KHCN' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '10px', borderRadius: 6, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 4, background: item.color + '22', color: item.color }}>{item.priority}</span>
                  <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{item.actor}</span>
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{item.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={9} color="var(--text-muted)" />
                  <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{item.timeframe}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
