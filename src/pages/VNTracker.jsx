import React, { useState } from 'react';
import { nghiQuyet57KPIs, nghiQuyetTable } from '../data/nghiQuyet57';
import { countryProfiles } from '../data/geoProfiles';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area, CartesianGrid } from 'recharts';

const STATUS_CONFIG = {
  'on-track': { color: '#22d3a0', label: 'Đúng tiến độ', bg: 'rgba(34,211,160,0.1)' },
  'behind': { color: '#f59e0b', label: 'Chậm tiến độ', bg: 'rgba(245,158,11,0.1)' },
  'critical': { color: '#f43f5e', label: 'Nghiêm trọng', bg: 'rgba(244,63,94,0.1)' },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#131316', border: '1px solid #252528', borderRadius: 6, padding: '8px 10px', fontSize: 11 }}>
      <div style={{ color: '#888', marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => <div key={i} style={{ color: p.color }}>{p.name}: <strong>{p.value}</strong></div>)}
    </div>
  );
};

function KPICard({ kpi }) {
  const pct = kpi.isRank ? Math.max(0, 100 - (kpi.current - kpi.target2030) * 15) : Math.min(100, (kpi.current / kpi.target2030) * 100);
  const status = pct >= 80 ? 'on-track' : pct >= 50 ? 'behind' : 'critical';
  const sc = STATUS_CONFIG[status];
  const sparkData = Array.from({ length: 8 }, (_, i) => ({
    v: parseFloat((kpi.current * (0.72 + i * 0.04 + Math.random() * 0.02)).toFixed(2))
  }));

  return (
    <div style={{ background: 'var(--surface)', border: `1px solid var(--border)`, borderTop: `3px solid ${sc.color}`, borderRadius: 8, padding: '13px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{kpi.category}</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>{kpi.label}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: sc.bg, color: sc.color }}>{sc.label}</span>
          <div style={{ fontSize: 9, color: kpi.trendUp ? '#22d3a0' : '#f43f5e', marginTop: 3, textAlign: 'right' }}>{kpi.trend}</div>
        </div>
      </div>
      {!kpi.subProgressList && (
        <>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginBottom: 8 }}>
            <span style={{ fontSize: 26, fontWeight: 800, color: sc.color, fontFamily: 'JetBrains Mono, monospace', lineHeight: 1 }}>{kpi.current}</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{kpi.unit}</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 'auto', fontFamily: 'monospace' }}>Mục tiêu: {kpi.target2030}{kpi.unit}</span>
          </div>
          <div className="progress-bar" style={{ marginBottom: 5 }}>
            <div className="progress-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${sc.color}77, ${sc.color})` }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{Math.round(pct)}% đến mục tiêu 2030</span>
            <ResponsiveContainer width={72} height={22}>
              <AreaChart data={sparkData}>
                <Area type="monotone" dataKey="v" stroke={sc.color} fill={sc.color + '22'} strokeWidth={1.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {kpi.subProgressList && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
          {kpi.subProgressList.map((sp, i) => {
            const spct = sp.isRank ? Math.max(0, 100 - (sp.current - sp.target) * 8) : Math.min(100, (sp.current / sp.target) * 100);
            return (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 9, color: 'var(--text-secondary)', lineHeight: 1.2, paddingRight: 8 }}>{sp.label}</span>
                  <span style={{ fontSize: 9, fontFamily: 'monospace', color: sc.color, flexShrink: 0, fontWeight: 700 }}>{sp.isRank ? `Top ${sp.current}` : `${sp.current}${sp.unit || '%'}`}</span>
                </div>
                <div className="progress-bar" style={{ height: 4, marginBottom: 0 }}>
                  <div className="progress-fill" style={{ width: `${spct}%`, background: `linear-gradient(90deg, ${sc.color}44, ${sc.color})` }} />
                </div>
                <div style={{ fontSize: 8, color: 'var(--text-muted)', marginTop: 3, textAlign: 'right' }}>Mục tiêu: {sp.isRank ? `Top ${sp.target}` : `${sp.target}${sp.unit || '%'}`}</div>
              </div>
            );
          })}
        </div>
      )}
      {/* Benchmarks mini */}
      {kpi.benchmarks && (
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
          {kpi.benchmarks.slice(0, 2).map(b => (
            <div key={b.country} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{b.country}</span>
              <span style={{ fontSize: 9, fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{b.value}{kpi.unit}</span>
            </div>
          ))}
        </div>
      )}
      {/* Details mini */}
      {kpi.details && (
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {kpi.details.map((d, i) => (
            <div key={i} style={{ fontSize: 10, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              • {d}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function VNTracker() {
  const onTrack = nghiQuyetTable.filter(r => r.status === 'on-track').length;
  const behind = nghiQuyetTable.filter(r => r.status === 'behind').length;
  const critical = nghiQuyetTable.filter(r => r.status === 'critical').length;

  const radarData = ['Bán dẫn', 'AI', 'Sinh học', 'Không gian', 'Lượng tử'].map((s, i) => {
    const keys = ['semi', 'ai', 'bio', 'space', 'quantum'];
    const obj = { subject: s };
    countryProfiles.filter(c => ['Mỹ', 'Trung Quốc', 'Hàn Quốc', 'Việt Nam'].includes(c.country))
      .forEach(c => { obj[c.country] = c[keys[i]]; });
    return obj;
  });

  const progressData = [
    { name: 'Kinh tế số', current: 18.3, target: 30, pct: Math.round(18.3 / 30 * 100) },
    { name: 'R&D/GDP', current: 0.53, target: 2, pct: Math.round(0.53 / 2 * 100) },
    { name: 'TFP', current: 46.2, target: 55, pct: Math.round(46.2 / 55 * 100) },
    { name: 'XK CN cao', current: 41.7, target: 50, pct: Math.round(41.7 / 50 * 100) },
    { name: 'Nhà NC', current: 7.2, target: 12, pct: Math.round(7.2 / 12 * 100) },
  ];

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: 16 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <h1 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>VN Tracker — Nghị quyết 57</h1>
          <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>Tiến độ thực hiện mục tiêu chiến lược 2025 → 2030 → 2045</p>
        </div>
        <span className="badge badge-brand">Cập nhật: Quý 1/2025</span>
      </div>

      {/* Overall scorecard */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 14 }}>
        {[
          { label: 'Đúng tiến độ', value: onTrack, color: '#22d3a0', icon: '✓' },
          { label: 'Chậm tiến độ', value: behind, color: '#f59e0b', icon: '⚠' },
          { label: 'Nghiêm trọng', value: critical, color: '#f43f5e', icon: '✕' },
        ].map(s => (
          <div key={s.label} style={{ background: 'var(--surface)', border: `1px solid ${s.color}33`, borderRadius: 8, padding: '14px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: s.color }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.color, fontFamily: 'JetBrains Mono, monospace', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>chỉ tiêu {s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 14 }}>
        {nghiQuyet57KPIs.map(kpi => <KPICard key={kpi.id} kpi={kpi} />)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        {/* Progress bar chart */}
        <div className="panel">
          <div className="panel-header"><span className="panel-title">📊 Tiến độ % đến mục tiêu 2030</span></div>
          <div className="panel-body">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={progressData} layout="vertical" barSize={14}>
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 9, fill: '#71717a' }} unit="%" />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#a1a1aa' }} width={70} />
                <CartesianGrid strokeDasharray="3 3" stroke="#252528" horizontal={false} />
                <Tooltip content={<CustomTooltip />} formatter={v => [`${v}%`, 'Tiến độ']} />
                <Bar dataKey="pct" name="Tiến độ" radius={[0, 3, 3, 0]}
                  fill="url(#barGrad)"
                  label={{ position: 'right', fontSize: 9, fill: '#888', formatter: v => `${v}%` }}
                />
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1e4079" /><stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar geopolitical position */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">🌐 Vị thế cạnh tranh Công nghệ</span>
            <span className="badge badge-brand">VN vs Khu vực</span>
          </div>
          <div className="panel-body">
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#2a2a2a" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: '#71717a' }} />
                {['Mỹ', 'Trung Quốc', 'Hàn Quốc', 'Việt Nam'].map((c, i) => {
                  const colors = ['#3b82f6', '#f43f5e', '#a855f7', '#22d3a0'];
                  return <Radar key={c} name={c} dataKey={c} stroke={colors[i]} fill={colors[i]} fillOpacity={c === 'Việt Nam' ? 0.25 : 0.04} strokeWidth={c === 'Việt Nam' ? 2.5 : 1.5} />;
                })}
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Gap analysis table */}
      <div className="panel">
        <div className="panel-header"><span className="panel-title">📋 Phân tích Khoảng cách — Mục tiêu 2030</span></div>
        <div className="panel-body" style={{ padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                {['Hạng mục', 'Mục tiêu 2030', 'Tầm nhìn 2045', 'Trạng thái'].map(h => (
                  <th key={h} style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {nghiQuyetTable.map((row, i) => {
                const sc = STATUS_CONFIG[row.status];
                return (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '9px 12px', fontSize: 11, fontWeight: 600, color: 'var(--text)' }}>{row.category}</td>
                    <td style={{ padding: '9px 12px', fontSize: 10, color: 'var(--text-secondary)', maxWidth: 260 }}>{row.target2030}</td>
                    <td style={{ padding: '9px 12px', fontSize: 10, color: 'var(--text-secondary)', maxWidth: 200 }}>{row.target2045}</td>
                    <td style={{ padding: '9px 12px' }}>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: sc.bg, color: sc.color }}>{sc.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
