import React, { useState } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { techGroups } from '../data/techSignals';

export default function TechMap() {
  const [selected, setSelected] = useState(techGroups[0]);

  const radarData = [
    { subject: 'AI & Tính toán', VN: 42, 'ASEAN Top 3': 75, 'Toàn cầu': 94 },
    { subject: 'Lượng tử', VN: 18, 'ASEAN Top 3': 42, 'Toàn cầu': 71 },
    { subject: 'Robot & LEO', VN: 31, 'ASEAN Top 3': 58, 'Toàn cầu': 68 },
    { subject: 'Y sinh', VN: 24, 'ASEAN Top 3': 61, 'Toàn cầu': 79 },
    { subject: 'Vật liệu & Năng lượng', VN: 29, 'ASEAN Top 3': 55, 'Toàn cầu': 65 },
  ];

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>Bản đồ Động lực Công nghệ Toàn cầu</h1>
        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>Nhóm công nghệ trọng điểm 2025-2026 và chiến lược Việt Nam · Phần 2</p>
      </div>

      {/* Tech Group Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 16 }}>
        {techGroups.map(group => (
          <div key={group.id} onClick={() => setSelected(group)} className="card-hover" style={{
            background: selected.id === group.id ? 'var(--brand-dim)' : 'var(--surface)',
            border: `1px solid ${selected.id === group.id ? 'rgba(30,64,121,0.5)' : 'var(--border)'}`,
            borderRadius: 8, padding: '12px', cursor: 'pointer',
          }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{group.icon}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: selected.id === group.id ? '#93bbff' : 'var(--text)', marginBottom: 4, lineHeight: 1.3 }}>{group.name}</div>
            <span className={`maturity-${group.maturity}`}>{group.maturityLabel}</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#3b82f6', fontFamily: 'monospace' }}>{group.globalSignal}</div>
                <div style={{ fontSize: 8, color: 'var(--text-muted)' }}>Toàn cầu</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#22d3a0', fontFamily: 'monospace' }}>{group.vnReadiness}</div>
                <div style={{ fontSize: 8, color: 'var(--text-muted)' }}>VN sẵn sàng</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        {/* Detail Panel */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">{selected.icon} {selected.name}</span>
            <span className={`maturity-${selected.maturity}`}>{selected.maturityLabel}</span>
          </div>
          <div className="panel-body">
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Xu hướng cốt lõi</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {selected.trends.map(t => (
                  <span key={t} style={{ fontSize: 10, padding: '4px 10px', borderRadius: 999, background: 'var(--brand-dim)', color: '#93bbff', border: '1px solid rgba(30,64,121,0.4)' }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Sản phẩm Đột phá</div>
              {selected.products.map(p => (
                <div key={p} style={{ fontSize: 11, color: 'var(--text-secondary)', padding: '4px 0', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: 'var(--accent-green)', fontSize: 10 }}>▸</span> {p}
                </div>
              ))}
            </div>
            <div style={{ padding: '12px', background: 'rgba(34,211,160,0.06)', border: '1px solid rgba(34,211,160,0.15)', borderRadius: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#22d3a0', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>🇻🇳 Liên hệ Chiến lược Việt Nam</div>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{selected.vnRelevance}</p>
            </div>
            {/* Recent signals */}
            {selected.signals.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Tín hiệu gần đây</div>
                {selected.signals.map(sig => {
                  const c = sig.strength === 'strong' ? '#f43f5e' : sig.strength === 'medium' ? '#f59e0b' : '#3b82f6';
                  return (
                    <div key={sig.id} style={{ padding: '8px', borderRadius: 6, background: 'rgba(255,255,255,0.02)', border: `1px solid ${c}22`, borderLeft: `2px solid ${c}`, marginBottom: 6 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{sig.title}</div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{sig.source}</span>
                        <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{sig.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Radar chart */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">📡 So sánh Năng lực Công nghệ</span>
            <span className="badge badge-brand">Việt Nam vs ASEAN vs Toàn cầu</span>
          </div>
          <div className="panel-body">
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#2a2a2a" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: '#71717a' }} />
                <Radar name="Toàn cầu" dataKey="Toàn cầu" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={1.5} />
                <Radar name="ASEAN Top 3" dataKey="ASEAN Top 3" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} strokeWidth={1.5} />
                <Radar name="Việt Nam" dataKey="VN" stroke="#22d3a0" fill="#22d3a0" fillOpacity={0.2} strokeWidth={2} />
                <Legend wrapperStyle={{ fontSize: 10, color: '#888' }} />
                <Tooltip contentStyle={{ background: '#131316', border: '1px solid #252528', borderRadius: 6, fontSize: 11 }} />
              </RadarChart>
            </ResponsiveContainer>

            {/* Global signal bar */}
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Chỉ số Tín hiệu Toàn cầu theo lĩnh vực</div>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={techGroups.map(g => ({ name: g.icon, global: g.globalSignal, vn: g.vnReadiness }))} barSize={16}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 9, fill: '#71717a' }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: '#131316', border: '1px solid #252528', borderRadius: 6, fontSize: 11 }} />
                  <Bar dataKey="global" fill="#3b82f6" radius={[2, 2, 0, 0]} name="Toàn cầu" />
                  <Bar dataKey="vn" fill="#22d3a0" radius={[2, 2, 0, 0]} name="Việt Nam" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* AI alignment table */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">🔗 Đối chiếu Công nghệ ↔ Bài toán kinh tế - xã hội Việt Nam</span>
        </div>
        <div className="panel-body">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>{['Công nghệ mới nổi', 'Bài toán VN được giải quyết', 'Chiến lược liên kết', 'Độ ưu tiên'].map(h => (
                <th key={h} style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', padding: '6px 10px', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {[
                { tech: 'Pin thế hệ mới (Solid-state, Sodium)', problem: 'An ninh năng lượng & ổn định lưới điện phân tán', strategy: 'NQ57: Kinh tế số + năng lượng tái tạo ngoài khơi', priority: 'CAO', p: '#f59e0b' },
                { tech: 'Vệ tinh LEO D2D & UAV', problem: 'Phủ sóng vùng lõm, nông nghiệp thông minh, cảnh báo thiên tai', strategy: 'NQ57: 5G toàn quốc, hạ tầng số nông nghiệp', priority: 'CAO', p: '#f59e0b' },
                { tech: 'Công nghệ sinh học biển & CRISPR', problem: 'Thích ứng biến đổi khí hậu, kinh tế xanh', strategy: 'NQ57: Xuất khẩu CN cao, Y tế thông minh', priority: 'TRUNG', p: '#3b82f6' },
                { tech: 'AI Copilots & Agentic AI', problem: 'Tăng năng suất lao động tri thức & lập trình', strategy: 'NQ57: TFP >55%, DN đổi mới sáng tạo >40%', priority: 'KHẨN', p: '#f43f5e' },
                { tech: 'PQC & Mật mã hậu lượng tử', problem: 'Bảo mật hạ tầng số quốc gia trong thời đại lượng tử', strategy: 'NQ57: Hạ tầng số an toàn, Top 50 GCI', priority: 'CAO', p: '#f59e0b' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '10px', fontSize: 11, fontWeight: 600, color: 'var(--text)' }}>{row.tech}</td>
                  <td style={{ padding: '10px', fontSize: 11, color: 'var(--text-secondary)' }}>{row.problem}</td>
                  <td style={{ padding: '10px', fontSize: 11, color: 'var(--text-secondary)' }}>{row.strategy}</td>
                  <td style={{ padding: '10px' }}><span style={{ fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: row.p + '22', color: row.p }}>{row.priority}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
